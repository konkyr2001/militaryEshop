import shoe1 from "../../assets/shoes/air-zoom-pegasus-37.png";
import shoe2 from "../../assets/shoes/Maroon.png";
import shoe3 from "../../assets/shoes/air-max-90-flyease.png";
import shoe4 from "../../assets/shoes/cosmic-unity.png";
import Item from "./Item";

function BestSelling() {
  return (
    <div className="mt-40 font-cabinet pt-10">
      <div className="flex w-full">
        <h1 className="text-black font-cabinetMedium text-4xl">BEST SELLING</h1>
        <ul className="flex gap-x-14 ml-auto mr-4">
          <li>
            <button>
              <p className="font-bold">PREV</p>
              <div className="arrow-left"></div>
              <span className="line w-9"></span>
            </button>
          </li>
          <li>
            <button>
              <p className="font-bold">NEXT</p>
              <span className="line w-9"></span>
              <div className="arrow-right"></div>
            </button>
          </li>
        </ul>
      </div>
      <section className="flex flex-col w-full">
        <ul className="flex gap-x-20 justify-center py-20">
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
              ratingValue={4}
              ratingAmount={75}
            />
          </li>
        </ul>
        <button className="bg-black py-2 px-5 w-fit text-white font-cabinet font-semibold m-auto">
          SHOP NOW
        </button>
      </section>
    </div>
  );
}

export default BestSelling;
