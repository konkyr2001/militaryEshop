import { useState } from "react";
import "./QuantityInput.css";

function QuantityInput() {
    const [quantity, setQuantity] = useState(1);

    function handleMinus() {
        if (quantity === 0)
            return;
        setQuantity((prevQuantity) => prevQuantity - 1);
    }

    function handlePlus() {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }
    return <span className="quantity-container">
        <button onClick={handleMinus}>
            <i className="fa-solid fa-minus"></i>
        </button>
        <input type="number" value={quantity} disabled={true}/>
        <button onClick={handlePlus}>
            <i className="fa-solid fa-plus"></i>
        </button>
    </span>
}

export default QuantityInput;