import shoe1 from "../../assets/shoes/air-zoom-pegasus-37.png";
import shoe2 from "../../assets/shoes/Maroon.png";
import shoe3 from "../../assets/shoes/air-max-90-flyease.png";
import shoe4 from "../../assets/shoes/cosmic-unity.png";
import Item from "./Item";

function ShopSection() {
  return (
    <div className="font-cabinet mt-44 pb-10">
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
      <section className="flex flex-col gap-y-12 w-full pt-20">
        <ul className="flex gap-x-20 justify-center">
          <li className="w-[270px]">
            <Item
              icon={shoe1}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              ratingValue={5}
              ratingAmount={88}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe2}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              ratingValue={5}
              ratingAmount={88}
              paddingTop={"40px"}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe3}
              title="HAVIT HV-G92 Gamepad"
              money="1160"
              discount="35"
              ratingValue={5}
              ratingAmount={75}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe4}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              ratingValue={4}
              ratingAmount={88}
            />
          </li>
        </ul>
        <ul className="flex gap-x-20 justify-center">
          <li className="w-[270px]">
            <Item
              icon={shoe3}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              ratingValue={5}
              ratingAmount={88}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe4}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              discount="35"
              ratingValue={5}
              ratingAmount={75}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe2}
              title="HAVIT HV-G92 Gamepad"
              money="1160"
              ratingValue={5}
              ratingAmount={88}
              paddingTop={"40px"}
            />
          </li>
          <li className="w-[270px]">
            <Item
              icon={shoe1}
              title="HAVIT HV-G92 Gamepad"
              money="160"
              discount="35"
              ratingValue={4}
              ratingAmount={75}
            />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ShopSection;
