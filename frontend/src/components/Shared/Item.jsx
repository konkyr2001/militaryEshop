import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Rating } from "react-simple-star-rating";
import "./Item.css";
import ReminderDialog from "./ReminderDialog";
import { addToFavourites, removeFromFavourites } from "../../services/user";
import { addToCart, removeFromCart } from "../../services/user";
import "like-effects";

function Item({
  id,
  icon,
  title,
  oldPrice,
  currentPrice,
  discount,
  ratingValue,
  ratingAmount,
  paddingTop,
  containerClass,
  listClass,
  titleClass,
  singlePost,
}) {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [cartInitialValue, setCartInitialValue] = useState(false);
  const [cart, setCart] = useState(false);
  const [favouritesInitialValue, setFavouritesInitialValue] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const dialogRef = useRef(null);
  const info = {
    id,
    icon,
    title,
    oldPrice,
    currentPrice,
    discount,
    ratingValue,
    ratingAmount,
    favouritesInitialValue,
    cartInitialValue,
  };

  const discountedPrice = discount
    ? Number(oldPrice) - (Number(oldPrice) * Number(discount)) / 100
    : currentPrice;

  useEffect(() => {
    if (user?.cart?.includes(id)) {
      setCartInitialValue(true);
    } else {
      setCartInitialValue(false);
    }
  }, [user, id]);

  useEffect(() => {
    if (user?.favourites?.includes(id)) {
      setFavouritesInitialValue(true);
    } else {
      setFavouritesInitialValue(false);
    }
  }, [user, id]);

  async function handleFavourites(like) {
    if (!user) {
      handleModal();
      return;
    }
    setFavourites(like);
    try {
      let response;
      if (!like) {
        response = await removeFromFavourites(user.email, id);
      } else {
        response = await addToFavourites(user.email, id);
      }
      if (response.found) {
        setUser((prevState) => ({
          ...prevState,
          favourites: response.favourites,
        }));
      }
    } catch (error) {
      console.log("error");
    }
  }

  async function handleCart(cart) {
    if (!user) {
      handleModal();
      return;
    }
    setCart(cart);
    try {
      let response;
      if (!cart) {
        response = await removeFromCart(user.email, id);
      } else {
        response = await addToCart(user.email, id);
      }
      if (response.found) {
        setUser((prevState) => ({
          ...prevState,
          cart: response.cart,
        }));
      }
    } catch (error) {
      console.log("error");
    }
    handleModal();
  }

  function handleModal() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  if (!containerClass) {
    containerClass =
      "bg-gray-200 h-[250px] flex justify-center items-center relative flex-1 basis-[21%]";
  }
  if (!listClass) {
    listClass = "flex flex-col gap-1 pt-3";
  }
  return (
    <>
      <div
        className={containerClass}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ paddingTop }}
      >
        <span className="absolute right-5 top-4 flex justify-center items-center w-[30px] h-[30px] rounded-1/2">
          <like-effects
            style={{ cursor: "default" }}
            checked={favouritesInitialValue}
            onClick={(e) => e.preventDefault()}
          >
            <i
              className={`fa-heart fa-regular text-red-500 text-2xl z-20`}
              slot="unchecked"
              onClick={() => handleFavourites(true)}
            ></i>
            <i
              className={`fa-heart fa-solid text-red-500 text-2xl z-20`}
              slot="checked"
              onClick={() => handleFavourites(false)}
            ></i>
          </like-effects>
        </span>
        {discount && (
          <span className="bg-red-500 absolute rounded-md top-4 left-5 text-white py-1 px-3">
            -{discount}%
          </span>
        )}
        {singlePost ? (
          <img
            className="w-[200px]"
            style={{ filter: "drop-shadow(5px 4px 1px rgba(0, 0, 0, 0.3))" }}
            src={icon}
          />
        ) : (
          <Link
            to={`/product/${id}`}
            onClick={() => localStorage.setItem("info", JSON.stringify(info))}
          >
            <img
              className="w-[200px] pointer"
              style={{ filter: "drop-shadow(5px 4px 1px rgba(0, 0, 0, 0.3))" }}
              src={icon}
            />
          </Link>
        )}

        <span
          className={`bg-black text-white text-center p-2 text-lg font-medium absolute w-full bottom-0 cursor-pointer
          ${visible ? "block" : "hidden"}`}
          onClick={() => handleCart(!cartInitialValue)}
        >
          {!cartInitialValue && <p className="hover:underline">Add To Cart</p>}
          {cartInitialValue && <p className="hover:underline">Remove From Cart</p>}
        </span>
      </div>
      <span className={listClass}>
        {singlePost ? (
          <p className={`color-black font-bold ${titleClass}`}>{title}</p>
        ) : (
          <Link
            to={`/product/${id}`}
            onClick={() => localStorage.setItem("info", JSON.stringify(info))}
          >
            <p className={`color-black font-bold hover:underline ${titleClass}`}>{title}</p>
          </Link>
        )}

        {discount && (
          <p>
            <span className="text-red-500 font-bold">${discountedPrice}</span>
            <span className="ml-4 line-through">${oldPrice}</span>
          </p>
        )}
        {!discount && <p>${currentPrice}</p>}
        <span className="flex">
          <Rating readonly={true} initialValue={ratingValue} />
          <span className="mt-[5px] ml-1 text-sm">({ratingAmount})</span>
        </span>
        {!user && <ReminderDialog ref={dialogRef} handleModal={handleModal} />}
      </span>
    </>
  );
}

export default Item;
