import { useState } from "react";
import QuantityInput from "../../components/Shared/QuantityInput";

function CartItem({ id, image, title, currentPrice, removeProduct }) {
    const [quantity, setQuantity] = useState(1);
    return <>
        <span className="pl-10 w-[50%] flex items-center gap-5 ">
            <img className="w-20" src={image} />
            <h2 className="font-tiktok font-light">{title}</h2>
        </span>
        <span className="flex-1">
            <p>{currentPrice}</p>
        </span>
        <span className="flex-1">
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
        </span>
        <span className="flex-1">
            ${Math.round(quantity * currentPrice * 100) / 100}
        </span>
        <span>
            <i
                onClick={() => removeProduct(id)}
                className="fa-solid fa-square-xmark cursor-pointer text-[25px] absolute right-5 top-1/2 -translate-y-1/2 text-slate-700">
            </i>
        </span>
    </>
}

export default CartItem;