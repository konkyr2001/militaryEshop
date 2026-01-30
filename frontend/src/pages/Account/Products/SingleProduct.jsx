import { useState } from "react";
import { deleteProduct } from "../../../services/products";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const _SHOEPATH = "/src/assets/shoes/";
function SingleProduct({ product, products, setProducts, userId, setAlert, setProductAlert }) {
    const date = new Date(product.createdAt);
    const dateText = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`

    function handleRemove() {
        async function removeProduct() {
            const deletedProduct = await deleteProduct(product.id, userId);
            if (deletedProduct.found) {
                const copy = [...products];
                copy.splice(copy.indexOf(product), 1);
                setProducts(copy);
                setProductAlert("Your product has been removed!");
            }
        }

        removeProduct();
    }

    return <li className="border-b-2 border-gray-500 w-full relative">
        <div className={`w-full p-4 flex items-center gap-5`}>
            <span className="min-w-32 flex justify-center items-center cursor-pointer">
                <Link
                    to={`/product/${product.id}`}
                >
                    <img src={`${_SHOEPATH}${product.icon}`} className="h-24" />
                </Link>
            </span>
            <span>
                <Link
                    to={`/product/${product.id}`}
                >
                    <h2 className="text-base text-black font-tiktok font-light cursor-pointer">{product.title}</h2>
                </Link>
                <p className="text-sm text-gray-600">Order Date: {dateText}</p>
                <p className="text-sm text-gray-600">Favourites: {product.likes}</p>
                <p className="text-sm text-gray-600">Sold: {product.bought}</p>
                <p className="text-sm text-gray-600">Ratings: 
                    {!product.ratings ? 0 : products.ratings}/5 ({!product.ratingAmount ? 0 : product.ratingAmount})</p>
            </span>
            <span className="ml-10 text-sm">
                {product.discount && (
                    <>
                        <p>Price before discount: {product.oldPrice}$</p>
                        <p>Discount: {product.discount}%</p>
                        <p>Current price: {product.currentPrice}$</p>
                    </>
                )}
                {!product.discount && <p>Price: ${product.currentPrice}</p>}
            </span>
            <span className="flex-1 flex justify-end mr-10">
                <i onClick={handleRemove} className="fa-solid fa-trash cursor-pointer hover:scale-150 active:scale-110 transition-transform"></i>
            </span>
        </div>
    </li>
}

export default SingleProduct;