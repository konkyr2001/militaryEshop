import { useParams, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import Account from "./Account";

function ProtectedAccountRoute() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    
    if (!user.id) { // if id doesnt exist ex: user refreshed but he is remembered
        user.id = localStorage.getItem("rememberID");
    }

    if (!user.id) { // not logged in
        return <Navigate to="/" replace />;
    }

    if (user.id !== id) {
        return <Navigate to="/" replace />;
    }

    return <Account />   
}

export default ProtectedAccountRoute;