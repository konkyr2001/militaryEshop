import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Rating } from "react-simple-star-rating";
import LoginDialog from "./ReminderDialog";
import "./Item.css";
import ReminderDialog from "./ReminderDialog";
import { addToFavourites, removeFromFavourites } from "../../services/user";

function Item({ id, icon, title, money, discount, ratingValue, ratingAmount, paddingTop }) {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [activeFavourites, setActiveFavourites] = useState();
  const dialogRef = useRef(null);
  const discountedPrice = discount
    ? Number(money) - (Number(money) * Number(discount)) / 100
    : money;

  useEffect(() => {
    if (user?.favourites?.includes(id)) {
      setActiveFavourites(true);
    } else {
      setActiveFavourites(false);
    }
  }, [user]);

  async function handleFavourites() {
    if (!user) {
      handleModal();
      return;
    }
    try {
      let response;
      if (activeFavourites) {
        response = await removeFromFavourites(user.email, id);
      } else {
        response = await addToFavourites(user.email, id);
      }
      if (response.found) {
        setActiveFavourites(true);
        setUser((prevState) => ({
          ...prevState,
          favourites: response.favourites,
        }));
      }
    } catch (error) {
      console.log("error");
    }
  }

  function handleCart() {
    if (!user) {
      handleModal();
      return;
    }
    console.log("add to cart");
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

  return (
    <>
      <div
        className="bg-gray-200 h-[250px] flex justify-center items-center
        relative flex-1 basis-[21%]"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ paddingTop }}
      >
        {id}
        <i
          className={`fa-regular fa-heart absolute text-xl right-5 top-4 cursor-pointer
             ${activeFavourites ? "bg-red-500" : ""}`}
          onClick={handleFavourites}
        ></i>
        {discount && (
          <span className="bg-red-500 absolute rounded-md top-4 left-5 text-white py-1 px-3">
            -{discount}%
          </span>
        )}
        <img
          className="w-[200px]"
          style={{ filter: "drop-shadow(5px 4px 1px rgba(0, 0, 0, 0.3))" }}
          src={icon}
        />

        <p
          className={`bg-black text-white text-center p-2 text-lg font-medium absolute w-full bottom-0 cursor-pointer
          ${visible ? "block" : "hidden"}`}
          onClick={handleCart}
        >
          Add To Cart
        </p>
      </div>
      <span className="flex flex-col gap-1 pt-3">
        <p className="color-black font-bold">{title}</p>
        {discount && (
          <p>
            <span className="text-red-500 font-bold">${discountedPrice}</span>
            <span className="ml-4 line-through">${money}</span>
          </p>
        )}
        {!discount && <p>${money}</p>}
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
