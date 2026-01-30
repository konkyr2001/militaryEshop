import { useEffect, useState } from "react";
import ProductHeaderList from "./ProductHeaderList";
import "./Products.css";
import ProductUpload from "./ProductUpload";
import MyProducts from "./MyProducts";
import Alert from "@mui/material/Alert";

function Products({ currentUser }) {
    const [activeTab, setActiveTab] = useState('PRODUCTS');
    const [productAlert, setProductAlert] = useState();

    useEffect(() => {
        if (!productAlert) return;
        
        const timer = setTimeout(() => {
            setProductAlert(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [productAlert]);

    return <div className="w-full h-full pb-5 user-products flex flex-col overflow-hidden">
        {productAlert && (
            <Alert severity="success">{productAlert}</Alert>
        )}
        <ProductHeaderList activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={`w-[90%] flex-1 m-auto rounded ${activeTab == "PRODUCTS" ? 'overflow-x-auto' : 'overflow-hidden'}`}>
            {activeTab == "PRODUCTS" && <MyProducts currentUser={currentUser} setProductAlert={setProductAlert} />}
            {activeTab == "UPLOAD" && <ProductUpload currentUser={currentUser} setActiveTab={setActiveTab} setProductAlert={setProductAlert} />}
        </div>
    </div>

}

export default Products;