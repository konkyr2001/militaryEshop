import { useEffect, useState, useRef, useContext } from "react";
import "./CartPage.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { getProductById, getProductsById } from "../../services/products";
import { removeFromCart, addUserCheckout, getUserById } from "../../services/user";
import CartItem from "./CartItem";
import { formatPrice } from "../../scripts/function";
import Shipping from "./Shipping";
import Alert from "@mui/material/Alert";
import EmptyCart from "./EmptyCart";
import { UserContext } from "../../App";
import Home from "../Home";
import { createCheckout } from "../../services/checkout";

const _SHOEPATH = "/src/assets/shoes/";
const defaultLocation = {
    longitude: 23.7162,
    latitude: 37.9838,
}
function Cart() {
    const navigate = useNavigate();
    const { id } = useParams();
    const url = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({
        visible: false,
        type: '',
        message: '',
    });
    const [items, setItems] = useState([]);
    const [userState, setUserState] = useState();
    const {user, setUser} = useContext(UserContext);
    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [total, setTotal] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [location, setLocation] = useState({
        coordinates: defaultLocation,
        message: '',
    });
    const shippingRef = useRef(null);

    useEffect(() => {
        if (!alert.type) return;

        const timer = setTimeout(() => {
            setAlert({
                visible: false,
                type: '',
                message: '',
            });
        }, 2000);

        return () => clearTimeout(timer); // cleanup
    }, [alert]);

    useEffect(() => {
        async function getProduct() {
            const product = await getProductById(id);
            setItems((oldArr) => [...oldArr, product]);
            setIsLoading(false);
        }
        async function getUserCart() {
            const currentUser = await getUserById(id);
            setUserState(currentUser);
            const products = await getProductsById(currentUser.cart);
            setItems(products);
            setIsLoading(false);
        }

        setIsLoading(true);
        url.pathname.includes("account") ? getUserCart() : getProduct();
    }, [url.pathname]);

    useEffect(() => {
        setTotal(subtotal + shippingCost);
    }, [subtotal, shippingCost]);

    function handleModal() {
        setShowMap((prevShowMap) => !prevShowMap);
    }

    async function removeProduct(productID, title, subtotal) {
        try {
            const response = await removeFromCart(userState.email, productID);
            if (response.found) {
                setUserState((prevState) => ({
                    ...prevState,
                    cart: response.cart,
                }));
                setUser({
                    ...userState,
                    cart: response.cart
                });
                localStorage.removeItem(productID);
                setItems(prevItems => 
                    prevItems.filter(item => item.id !== productID)     
                );
                setSubtotal((prevSubTotal) => prevSubTotal - subtotal);
                setAlert({
                    visible: true,
                    type: 'success',
                    message: <p><strong>{title}</strong> has been removed from the cart!</p>,
                });
            }
        } catch (error) {
            console.log("error");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!location.message) {
            setAlert({
                visible: true,
                type: 'error',
                message: 'Please set a shipping location!'
            })
            return;
        }

        if (confirm("Press a button!")) {
            const itemsQuantity = items.map((item) => {
                const quantity = localStorage.getItem(item.id) ? localStorage.getItem(item.id) : 1;
                return {
                    id: item.id,
                    title: item.title,
                    icon: item.icon,
                    price: item.currentPrice,
                    quantity
                }
            });
            const checkoutObject = {
                buyer: userState.id,
                items: itemsQuantity,
                shippingCost: shippingCost,
                subtotal,
                total,
                shippingLocation: {
                    message: location.message,
                    lat: location.coordinates.latitude,
                    lon: location.coordinates.longitude,
                }
            };
            try {
                const checkout = await createCheckout(checkoutObject);
                if (checkout) {
                    const userCheckout = await addUserCheckout(userState.id, checkout.id);
                    if (userCheckout) {
                        console.log("ola entaksei ", userCheckout);
                        items.map((item) => {
                            localStorage.removeItem(item.id);
                        });
                        return navigate('/');
                    }
                }
            } catch (error) {
                console.log(error.message);
                return navigate('/');
            }
        }
        return;
    }

    if (isLoading) return null;

    if (items && items.length === 0) {
        return <EmptyCart />
    }

    return <div className="cart-container">
        {alert.visible && <Alert severity={alert.type}>{alert.message}</Alert>}
        <div className="w-full flex justify-center items-center h-[100px]">
            <h1 className="text-5xl font-bold font-cabinet">Your Cart</h1>
        </div>
        <div className="w-full h-full flex flex-row justify-between py-16 gap-10">
            <div className="table w-[70%] max-h-max h-fit">
                <div className="table-header flex mb-5 pb-2 text-slate-500 text- border-slate-200 border-b-2">
                    <span className="pl-10 w-[50%] font-tiktok">PRODUCT</span>
                    <span className="flex-1 font-tiktok">PRICE</span>
                    <span className="flex-1 font-tiktok">QUANTITY</span>
                    <span className="flex-1 font-tiktok">TOTAL</span>
                </div>
                <div className="table-body w-full">
                    {items?.map(item => {
                        return <div key={item.id} className="flex items-center relative max-h-[100px] w-full border-slate-200 border-b-2 pb-2 mb-5">
                            <CartItem
                                id={item.id}
                                image={`${_SHOEPATH}${item.icon}`}
                                title={item.title}
                                currentPrice={item.currentPrice}
                                removeProduct={removeProduct}
                                setSubtotal={setSubtotal}
                                setUserState={setUserState}
                            />
                        </div>
                    })};
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[30%] min-h-[300px] h-fit flex flex-col sticky top-10">
                <div className="flex flex-col bg-slate-200 text-black">
                    <div className="border-b-2 border-gray-300 p-5">
                        <h3 className="font-extrabold font-cabinetMedium">Order Summary</h3>
                    </div>
                    <div className="border-b-2 border-gray-300 px-5 flex flex-col gap-1 p-5">
                        <span className="w-full">
                            <p className="float-left">Subtotal</p>
                            <p className="float-right font-extrabold">${formatPrice(subtotal)}</p>
                        </span>
                        <span className="w-full  flex items-center justify-between">
                            <div className="relative"
                            >
                                <span className={`${location.message ? 'text-cyan-500' : 'text-red-500'} cursor-pointer hover:underline underline-offset-2 w-fit`}>
                                    <p className="whitespace-nowrap"
                                        onClick={handleModal}
                                        ref={shippingRef}
                                    >Shipping Address<i className="fa-solid fa-location-dot ml-1"></i></p>

                                </span>
                                {showMap && <Shipping location={location} setLocation={setLocation}
                                    setIsDialogOpen={setShowMap} shippingRef={shippingRef}
                                    defaultLocation={defaultLocation} setShippingCost={setShippingCost} />}

                            </div>
                            {location.message && <p className="text-sm text-right font-tiktok">{location.message}</p>}
                        </span>
                        <span className="w-full">
                            <p className="float-left">Shipping Cost</p>
                            <p className="float-right font-extrabold">${formatPrice(shippingCost)}</p>
                        </span>
                    </div>
                    <div className="fborder-b-2 border-gray-300 p-5">
                        <span className="w-full">
                            <h3 className="font-bold float-left">Total</h3>
                            <p className="float-right font-extrabold">${formatPrice(total)}</p>
                        </span>
                    </div>
                </div>
                <button type="submit" className="bg-green-600 text-slate-100 w-full h-[50px] tracking-wider">Checkout</button>
            </form>
        </div>
    </div>

}

export default Cart;