import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Rating } from "react-simple-star-rating";
import "./Item.css";
import ReminderDialog from "./ReminderDialog";
import { addToFavourites, removeFromFavourites } from "../../services/user";
import "like-effects";

function Item({ id, icon, title, money, discount, ratingValue, ratingAmount, paddingTop }) {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [favouritesInitialValue, setFavouritesInitialValue] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const dialogRef = useRef(null);
  const discountedPrice = discount
    ? Number(money) - (Number(money) * Number(discount)) / 100
    : money;

  useEffect(() => {
    if (user?.favourites?.includes(id)) {
      setFavouritesInitialValue(true);
    } else {
      setFavouritesInitialValue(false);
    }
  }, [user, id]);

  useEffect(() => {
    setFavouritesInitialValue(favourites);
  }, [favourites]);

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
        <span className="absolute right-5 top-4 flex justify-center items-center w-[30px] h-[30px] rounded-1/2">
          <like-effects
            style={{ cursor: "default" }}
            checked={favouritesInitialValue}
            onClick={(e) => e.preventDefault()}
          >
            <i
              className={`fa-heart fa-regular text-red-500 text-2xl`}
              slot="unchecked"
              onClick={() => handleFavourites(true)}
            ></i>
            <i
              className={`fa-heart fa-solid text-red-500 text-2xl`}
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
