import { useEffect, useState } from "react";
import "./Cart.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products";

const _SHOEPATH = "/src/assets/shoes/";
function Cart({ accountId }) {
    const { id } = useParams();
    // const { user, setUser } = useContext(UserContext);
    const [items, setItems] = useState([]);
    console.log(accountId)
    useEffect(() => {
        async function getProduct() {
            const product = await getProductById(id);
            setItems((oldArr) => [...oldArr, product]);
        }
        async function getUserCart() {

        }

        accountId ? getUserCart() : getProduct()
    }, [id]);

    console.log("items ", items);
    return <div className="w-[90%] m-auto h-[80vh]">
        <div className="w-full flex justify-center items-center h-[100px]">
            <h1 className="text-5xl font-bold font-cabinet">Your Cart</h1>
        </div>
        <div className="w-full max-h-full flex flex-row justify-between py-20">
            <table className="w-[70%] h-fit overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-[50%] text-left">Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="overflow-scroll h-full">
                    {items?.map(item => {
                        return <tr key={item.id}>
                            <td>
                                <div className="flex items-center">
                                    <img className="w-40" src={`${_SHOEPATH}${item.icon}`} />
                                    <h2 className="mb-8">{item.title}</h2>
                                </div>
                            </td>
                            <td className="text-center">
                                <p>{item.currentPrice}</p>
                            </td>
                            <td className="w-full h-full flex justify-center items-center">
                                <input className="border-gray-200 border-2 w-10 text-center" type="text" name="quantity" min="1" max="5" />
                            </td>
                            <td className="text-center">
                                $140
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="w-[25%] h-[300px] flex flex-col bg-purple-400">
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
                        <a className="text-cyan-500 cursor-pointer w-fit">Add coupon code <i className="fa-solid fa-arrow-right"></i></a>
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