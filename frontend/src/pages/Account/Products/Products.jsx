import { useState } from "react";
import ProductHeaderList from "./ProductHeaderList";
import "./Products.css";
import ProductUpload from "./ProductUpload";

function Products({ currentUser }) {
    const [activeTab, setActiveTab] = useState('PRODUCTS');

    return <div className="w-full h-full pt-10 pb-10 user-products flex flex-col overflow-hidden">
        <ProductHeaderList activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-[90%] flex-1 m-auto bg-gray-200 rounded">
            {activeTab == "UPLOAD" && <ProductUpload />}
        </div>
    </div>

}

export default Products;