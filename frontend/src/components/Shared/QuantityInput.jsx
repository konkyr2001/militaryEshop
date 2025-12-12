import "./QuantityInput.css";

function QuantityInput({ handleMinus, handlePlus, quantity }) {
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