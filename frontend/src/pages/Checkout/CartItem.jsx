import { useEffect, useState } from "react";
import QuantityInput from "../../components/Shared/QuantityInput";
import { formatPrice } from "../../scripts/function";

function CartItem({ id, image, title, currentPrice, removeProduct, setSubtotal }) {
    const [quantity, setQuantity] = useState();
    useEffect(() => {
        const initialQuantity = localStorage.getItem(id)
            ? parseInt(localStorage.getItem(id)) : 1;
        setSubtotal((prevTotal) => prevTotal + Number(currentPrice));
        setQuantity(initialQuantity);
    }, []);

    function handleMinus() {
        if (quantity == 1) return;
        setQuantity((prevQuantity) => prevQuantity - 1)
        setSubtotal((prevTotal) => prevTotal - Number(currentPrice));
        localStorage.setItem(id, quantity - 1);
    }

    function handlePlus() {
        setQuantity((prevQuantity) => prevQuantity + 1);
        setSubtotal((prevTotal) => prevTotal + Number(currentPrice));
        localStorage.setItem(id, quantity + 1);
    }

    return <>
        <span className="pl-10 w-[50%] flex items-center gap-5 ">
            <img className="w-20" src={image} />
            <h2 className="font-tiktok font-light">{title}</h2>
        </span>
        <span className="flex-1">
            <p>${formatPrice(currentPrice)}</p>
        </span>
        <span className="flex-1">
            <QuantityInput handleMinus={handleMinus} handlePlus={handlePlus} quantity={quantity} />
        </span>
        <span className="flex-1">
            ${formatPrice(currentPrice * quantity)}
        </span>
        <span>
            <i
                onClick={() => removeProduct(id, title, formatPrice(currentPrice * quantity))}
                className="fa-solid fa-square-xmark cursor-pointer text-[25px] absolute right-5 top-1/2 -translate-y-1/2 pb-2 text-slate-700">
            </i>
        </span>
    </>
}

export default CartItem;