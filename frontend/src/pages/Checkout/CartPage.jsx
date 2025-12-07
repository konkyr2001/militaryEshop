import { useEffect, useState, useContext, useRef } from "react";
import "./CartPage.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { getProductById, getProductsById } from "../../services/products";
import { removeFromCart } from "../../services/user";
import CartItem from "./CartItem";
import { formatPrice } from "../../services/function";
import Shipping from "./Shipping";
import Alert from "@mui/material/Alert";
import EmptyCart from "./EmptyCart";

const _SHOEPATH = "/src/assets/shoes/";
const defaultLocation = {
    longitude: 23.7162,
    latitude: 37.9838,
}
function Cart() {
    const { id } = useParams();
    const url = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [items, setItems] = useState([]);
    const { user, setUser } = useContext(UserContext);
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
        if (!alert) return;

        const timer = setTimeout(() => {
            setAlert(false);
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
            const products = await getProductsById(user.cart);
            setItems(products);
            setIsLoading(false);
        }

        setIsLoading(true);
        url.pathname.includes("account") ? getUserCart() : getProduct()
    }, [user, id]);

    useEffect(() => {
        setTotal(subtotal + shippingCost);
    }, [subtotal, shippingCost]);

    function handleModal() {
        setShowMap((prevShowMap) => !prevShowMap);
    }

    async function removeProduct(id) {
        try {
            const response = await removeFromCart(user.email, id);
            if (response.found) {
                setUser((prevState) => ({
                    ...prevState,
                    cart: response.cart,
                }));
                setAlert(true);
            }
        } catch (error) {
            console.log("error");
        }
    }

    function handleSubmit(e) {
        e.preventDefault(); W
        return;
    }

    if (isLoading) return;

    if (items && items.length === 0) {
        return <EmptyCart />
    }

    return <div className="cart-container">
        {alert && <Alert severity="success">Item has been removed from the cart!</Alert>}
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
                            />
                        </div>
                    })};
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[30%] h-[300px] flex flex-col sticky top-10">
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
                                <span className="text-cyan-500 cursor-pointer hover:underline underline-offset-2 w-fit">
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
                <button type="submit" className="m-auto bg-green-600 text-slate-100 w-full flex-grow tracking-wider">Checkout</button>
            </form>
        </div>
    </div>

}

export default Cart;