import { useState, useEffect, useRef, useContext } from "react";
import { getProductsById } from "../../services/products";
import { Rating } from "react-simple-star-rating";
import { removeFromCart, removeFromFavourites } from "../../services/user";
import { UserContext } from "../../App";
const _SHOEPATH = "/src/assets/shoes/";

function CartDialog({ imageRef, setIsDialogOpen, cart }) {
  const { user, setUser } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const divRef = useRef();

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const products = await getProductsById(cart);
      setCartProducts(products);
      setLoading(false);
    }

    getProducts();
  }, [cart]);

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
      const response = await removeFromCart(user.email, id);
      if (response.found) {
        setUser((prevState) => ({
          ...prevState,
          cart: response.cart,
        }));
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
      <div className="p-5 border border-gray-300 rounded-lg min-w-64 max-w-md w-full">
        {cartProducts.length === 0 ? (
          <p className="text-base text-center">No products added to cart yet!</p>
        ) : (
          <h2 className="font-bold">Your Cart ({cartProducts.length})</h2>
        )}
        <ul className="flex flex-col gap-4 max-h-[380px] overflow-auto pr-5">
          {cartProducts.map((product, index) => {
            return (
              <li className="flex items-center gap-0 relative" key={product.id}>
                <span className="absolute cursor-pointer right-1 mb-[10px] mt-2">
                  <i
                    className={`fa-trash fa-solid text-gray-500 hover:text-orange-500 text-base`}
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
      </div>
    </div>
  );
}

export default CartDialog;
