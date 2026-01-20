const _SHOEPATH = "/src/assets/shoes/";
function SingleOrder({ checkout }) {
    const date = new Date(checkout.createdAt);
    const dateText = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`
    return <li key={checkout.id} className="border-b-2 border-gray-500 w-full relative">
        {checkout.items.map((item, index) => (
            <div
                className={`${index < checkout.items.length - 1 ? 'border-b-2 border-gray-200 ' : ' '} w-full p-4 flex items-center gap-5`}
                key={item.id}
            >
                <span className="min-w-32 flex justify-center items-center">
                    <img src={`${_SHOEPATH}${item.icon}`} className="h-24" />
                </span>
                <span>
                    <h2 className="text-base text-black font-tiktok font-light">{item.title}</h2>
                    <p className="text-sm text-gray-600">Order Date: {dateText}</p>
                </span>
                <span className="ml-10 text-sm">
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Address: {checkout.shippingLocation.message}</p>
                </span>
            </div>
        ))}
    </li>
}

export default SingleOrder;