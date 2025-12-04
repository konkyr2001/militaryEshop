import { useParams, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import Cart from "./Cart";

function ProtectedCartRoute() {
    const url = useLocation();
    const { id } = useParams();
    const { user } = useContext(UserContext);

    if (!user.id) { // if id doesnt exist, ex: user refreshed but he is remembered
        user.id = localStorage.getItem("rememberID");
    }

    if (!user.id || !id) { // not logged in
        return <Navigate to="/" replace />;
    }
    
    return <Cart />   
}

export default ProtectedCartRoute;