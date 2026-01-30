import { useEffect } from "react";
import { getUserCreatedProductsIds } from "../../../services/user";
import { useState } from "react";
import SingleProduct from "./SingleProduct";
import Alert from "@mui/material/Alert";
import Loading from "../../../components/Shared/Loading";

function MyProducts({ currentUser, setProductAlert }) {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        async function getProducts() {
            const products = await getUserCreatedProductsIds(currentUser.id);
            setProducts(products);
        }
        setIsLoading(true);
        getProducts();
        setIsLoading(false);
    }, []);



    if (isLoading) return <Loading />

    if (products && products.length == 0) {
        return <p className="flex justify-center items-center w-full h-full text-xl font-semibold">You have uploaded any products yet!</p>
    }

    return <ul className="w-full h-full">
        {products?.map(product =>
            <SingleProduct key={product.id} product={product} products={products} setProducts={setProducts} userId={currentUser.id} setProductAlert={setProductAlert} />
        )}
    </ul>
}

export default MyProducts;