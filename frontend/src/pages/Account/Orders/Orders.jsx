import { useEffect, useState } from "react";
import { getCheckoutsById } from "../../../services/checkout.js";
import { emptyOrderLabel } from "./orderLabel.js";
import SingleOrder from "./SingleOrder.jsx";
import Loading from "../../../components/Shared/Loading.jsx";

function Orders({ currentUser }) {
    const [isLoading, setIsLoading] = useState();
    const [checkouts, setCheckouts] = useState([]);
    const randomNumber = Math.floor(Math.random() * emptyOrderLabel.length)
    useEffect(() => {
        async function getCheckouts() {
            const userCheckouts = await getCheckoutsById(currentUser.checkouts);
            if (userCheckouts) {
                setCheckouts(userCheckouts);
            }
        };
        setIsLoading(true);
        getCheckouts();
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loading />;

    if (checkouts && checkouts.length == 0) {
        return <span className="text-center">
            <p className="text-xl font-medium">{emptyOrderLabel[randomNumber][0]}</p>
            <p className="text-sm">{emptyOrderLabel[randomNumber][1]}</p>
        </span>
    }
    
    return <ul className="w-full h-full overflow-auto">
        {checkouts?.map(checkout => 
            <SingleOrder key={checkout.id} checkout={checkout} />
        )}
    </ul>
};

export default Orders;