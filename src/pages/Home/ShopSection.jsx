import SportShoe from "../../assets/SportShoes.png";
import Item from "./Item";

function ShopSection() {
  return (
    <div className="font-cabinet">
      <ul className="flex gap-x-10">
        <li>
          <button
            className="rounded-3xl px-6 py-2 bg-lightPurple text-white font-cabinet
  font-bold border-lightPurpleStroke border-4 tracking-wide shadow-xl"
          >
            NEW ARRIVALS
          </button>
        </li>
        <li>
          <button
            className="rounded-3xl px-6 py-2 bg-lightGreen text-white font-cabinet
  font-bold border-lightGreenStroke border-4 tracking-wide shadow-2xl"
          >
            NEW TRENDING
          </button>
        </li>
      </ul>
      <section className="w-full h-[500px] pt-20">
        <ul>
          <li className="w-[270px]">
            <Item />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ShopSection;
