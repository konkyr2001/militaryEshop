import SportShoe from "../../assets/SportShoes.png";
import { useState } from "react";
function Item() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        className="bg-gray-200 h-[250px] flex justify-center items-center relative"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <i className="fa-regular fa-heart absolute text-2xl right-5 top-4"></i>
        <img
          className="w-[200px]"
          style={{ filter: "drop-shadow(5px 4px 1px rgba(0, 0, 0, 0.3))" }}
          src={SportShoe}
        />

        <p
          className={`bg-black text-white text-center p-2 text-lg font-medium absolute w-full bottom-0
          ${visible ? "block" : "hidden"}`}
        >
          Add To Cart
        </p>
      </div>
      <span className="flex flex-col gap-1 pt-3">
        <p className="color-black font-bold">HAVIT HV-G92 Gamepad</p>
        <p>$160</p>
        <p>stars</p>
      </span>
    </>
  );
}

export default Item;
