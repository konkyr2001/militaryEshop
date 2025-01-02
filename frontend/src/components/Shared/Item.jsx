import { useState, useRef } from "react";
import { Rating } from "react-simple-star-rating";
import LoginDialog from "./ReminderDialog";
import "./Item.css";
function Item({ icon, title, money, discount, ratingValue, ratingAmount, paddingTop }) {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState();
  const dialogRef = useRef(null);
  const discountedPrice = discount
    ? Number(money) - (Number(money) * Number(discount)) / 100
    : money;

  function handleFavourite() {
    setAction("like");
    handleModal();
  }

  function handleCart() {
    setAction("cart");
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
        className="bg-gray-200 h-[250px] flex justify-center items-center relative"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ paddingTop }}
      >
        <i
          className="fa-regular fa-heart absolute text-xl right-5 top-4 cursor-pointer"
          onClick={handleFavourite}
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
        <LoginDialog ref={dialogRef} handleModal={handleModal}>
          {action === "like" && <p>Please login before clicking like!</p>}
          {action === "cart" && <p>Please login before adding this item to cart!</p>}
        </LoginDialog>
      </span>
    </>
  );
}

export default Item;
