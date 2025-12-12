import { Link } from "react-router-dom";

function EmptyCart() {
    return <div className="cart-container flex justify-center items-center flex-col">
        <i
            className="fa-solid fa-cart-plus text-cyan-500 text-[72px] md:text-[120px] drop-shadow-lg"
            aria-hidden="true"
        />
        <h2 className="w-full text-center text-2xl md:text-4xl font-semibold text-gray-800">
            Your cart is empty… but our servers are ready to get busy.
        </h2>
        <Link className="text-sm text-gray-500 underline hover:text-gray-700" to={'/'}>Start your shopping therapy!</Link>
    </div>
}

export default EmptyCart;