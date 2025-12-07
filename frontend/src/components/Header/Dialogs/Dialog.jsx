import { useState, useEffect, useRef, useContext } from "react";
import { getProductsById } from "../../../services/products";
import { Rating } from "react-simple-star-rating";
import { removeFromFavourites } from "../../../services/user";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import QuantityInput from "../../Shared/QuantityInput";
const _SHOEPATH = "/src/assets/shoes/";

function Dialog({ imageRef, setIsDialogOpen, productsList, remove, emptyText, modalType, icon }) {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const divRef = useRef();
  let totalCost = 0;
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const products = await getProductsById(productsList);
      setProducts(products);
      setLoading(false);
    }

    getProducts();
  }, [productsList]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        divRef &&
        !divRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  async function removeProduct(id) {
    try {
      const type = modalType.toLowerCase();
      const response = await remove(user.email, id);
      if (response.found) {
        if (type === "favourites") {
          setUser((prevState) => ({
            ...prevState,
            favourites: response.favourites,
          }));
        } else {
          setUser((prevState) => ({
            ...prevState,
            cart: response.cart,
          }));
        }
      }
    } catch (error) {
      console.log("error");
    }
  }

  if (loading) {
    return;
  }
  return (
    <div ref={divRef} className="absolute top-[50px] -right-10 z-50 bg-white shadow-md rounded-lg">
      <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-[38px] -top-[0.9rem]"></div>
      <div className="p-5 border border-gray-300 rounded-lg min-w-64 max-w-md">
        {products.length === 0 ? (
          <p className="text-base text-center">{emptyText}</p>
        ) : (
          <h2 className="font-bold">
            Your {modalType} ({products.length})
          </h2>
        )}
        <ul className="flex flex-col gap-4 max-h-[380px] overflow-auto pr-5">
          {products.map((product, index) => {
            totalCost += parseFloat(product.currentPrice);
            return (
              <li className="flex items-center gap-0 relative" key={product.id}>
                <span className="absolute cursor-pointer right-1 mb-[10px] mt-2">
                  <i
                    className={`${icon}`}
                    slot="checked"
                    onClick={() => removeProduct(product.id)}
                  ></i>
                </span>
                <img className="w-20 h-20 flex-shrink-0" src={`${_SHOEPATH}${product.icon}`} />
                <div className="text-sm w-full break-words">
                  <p className="text-center">{product.title}</p>
                  {product.discount && (
                    <p>
                      <span className="text-red-500 font-bold">${product.currentPrice}</span>
                      <span className="ml-4 line-through">${product.oldPrice}</span>
                    </p>
                  )}
                  {!product.discount && <p>${product.currentPrice}</p>}
                  <span className="flex ">
                    <Rating readonly={true} initialValue={product.rating} />
                    <span className="mt-[5px] ml-1 text-sm">({product.ratingAmount})</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        {modalType === "Cart" && products.length > 0 && (
          <span className="w-full flex justify-center">
            <Link
              to={`/account/cart/${user.id}`}
              onClick={(e) => setIsDialogOpen(false)}
            >
              <button className="bg-green-500 m-auto mt-2 px-5 p-1 rounded-md text-white font-cabinet shadow-md hover:bg-green-600 transition-all">
                GO TO CART ({products.length})
              </button>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default Dialog;
