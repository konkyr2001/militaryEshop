import { useEffect, useState } from "react";
import { getCheckoutsById } from "../../services/checkout";

function Orders({ currentUser }) {
    const [isLoading, setIsLoading] = useState([]);
    const [checkouts, setCheckouts] = useState([]);
    console.log(currentUser)
    useEffect(() => {
        async function getCheckouts() {
            const userCheckouts = await getCheckoutsById(currentUser.checkouts);
            if (userCheckouts) {
                setCheckouts(userCheckouts);
                console.log(userCheckouts)
                setIsLoading(true);
            }
        };
        setIsLoading(true);
        getCheckouts();
    }, []);

    if (!isLoading || checkouts.length == 0) {
        return <p>TSIFSA ROP</p>
    }
    return <div>{checkouts?.map(checkout => {
        {console.log(checkout.id)}
        return <p key={checkout.id}>{checkout.id}</p>
    })}
    </div>
};

export default Orders;