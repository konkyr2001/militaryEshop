import { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { getProductById, getProductsById } from "../../services/products";
import { removeFromCart } from "../../services/user";
import CartItem from "./CartItem";
const _SHOEPATH = "/src/assets/shoes/";
function Cart() {
    const { id } = useParams();
    const url = useLocation();
    const [items, setItems] = useState([]);
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        async function getProduct() {
            const product = await getProductById(id);
            setItems((oldArr) => [...oldArr, product]);
        }
        async function getUserCart() {
            const products = await getProductsById(user.cart);
            setItems(products);
        }

        url.pathname.includes("account") ? getUserCart() : getProduct()
    }, [user, id]);

    async function removeProduct(id) {
        try {
            const response = await removeFromCart(user.email, id);
            if (response.found) {
                setUser((prevState) => ({
                    ...prevState,
                    cart: response.cart,
                }));
            }
        } catch (error) {
            console.log("error");
        }
    }

    return <div className="m-auto min-h-[80vh] cart-container">
        <div className="w-full flex justify-center items-center h-[100px]">
            <h1 className="text-5xl font-bold font-cabinet">Your Cart</h1>
        </div>
        <div className="w-full h-full flex flex-row justify-between py-16">
            <div className="table w-[70%] max-h-max h-fit">
                <div className="table-header flex mb-5 pb-2 text-slate-500 text- border-slate-200 border-b-2">
                    <span className="pl-10 w-[50%] font-tiktok">PRODUCT</span>
                    <span className="flex-1 font-tiktok">PRICE</span>
                    <span className="flex-1 font-tiktok">QUANTITY</span>
                    <span className="flex-1 font-tiktok">TOTAL</span>
                </div>
                <div className="table-body w-full max-h-[400pasx] overflow-yasd-auto">
                    {items?.map(item => {
                        return <div key={item.id} className="flex items-center relative max-h-[100px] w-full border-slate-200 border-b-2 pb-2 mb-5">
                            <CartItem
                                id={item.id}
                                image={`${_SHOEPATH}${item.icon}`}
                                title={item.title}
                                currentPrice={item.currentPrice}
                                removeProduct={removeProduct}
                            />
                        </div>
                    })};
                </div>
            </div>
            <div className="w-[25%] h-[300px] flex flex-col bg-purple-400 sticky top-10">
                <div className="flex flex-col bg-slate-200 text-black">
                    <div className="border-b-2 border-gray-300 p-5">
                        <h3 className="font-extrabold font-cabinetMedium">Order Summary</h3>
                    </div>
                    <div className="border-b-2 border-gray-300 px-5 flex flex-col gap-1 p-5">
                        <span className="w-full">
                            <p className="float-left">Subtotal</p>
                            <p className="float-right font-extrabold">$418</p>
                        </span>
                        <span className="w-full">
                            <p className="float-left">Shopping</p>
                            <p className="float-right font-extrabold">FREE</p>
                        </span>
                        <a className="text-orange-600 cursor-pointer w-fit">Add coupon code <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className="fborder-b-2 border-gray-300 p-5">
                        <span className="w-full">
                            <h3 className="font-bold float-left">Total</h3>
                            <p className="float-right font-extrabold">FREE</p>
                        </span>
                    </div>
                </div>
                <button className="m-auto bg-green-600 text-slate-100 w-full flex-grow tracking-wider">Checkout</button>
            </div>
        </div>
    </div>

}

export default Cart;