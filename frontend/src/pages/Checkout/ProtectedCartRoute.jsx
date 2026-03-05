import { useParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import Cart from "./CartPage";

function ProtectedCartRoute() {
    const { id } = useParams();
    const { user } = useContext(UserContext);

    if (!user.id) { // if id doesnt exist, ex: user refreshed but he is remembered
        user.id = localStorage.getItem("rememberID");
    }

    if (!user.id || !id) { // not logged in
        return <Navigate to="/error" replace />;
    }
    
    return <Cart />   
}

export default ProtectedCartRoute;