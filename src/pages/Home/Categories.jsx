import img1 from "../../assets/Rectangle 18.png";
import img2 from "../../assets/Rectangle 19.png";
import img3 from "../../assets/Rectangle 20.png";
import img4 from "../../assets/Rectangle 22.png";
import img5 from "../../assets/Rectangle 21.png";

function Categories() {
  return (
    <div className="mt-40 w-full">
      <ul className="flex flex-col w-full gap-2">
        <li className="w-full relative">
          <img src={img1} className="w-full h-auto" />
          <button className="text-white bg-black py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2">
            KIDS
          </button>
        </li>
        <li className="flex w-full gap-2 max-h-[600px]">
          <div className="flex-1 relative">
            <img className="flex-1 object-cover w-full h-full" src={img2} />
            <button className="text-white bg-black py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2">
              WOMEN
            </button>
          </div>
          <div className="relative">
            <img src={img3} className="object-cover w-full h-full" />
            <button className="text-white bg-black py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2">
              SNEAKERS
            </button>
          </div>
        </li>
        <li className="flex w-full gap-2 max-h-[600px]">
          <div className="relative">
            <img src={img4} className="object-cover w-full h-full" />
            <button className="text-black bg-white py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2">
              BOOTS
            </button>
          </div>
          <div className="flex-1 relative">
            <img className="object-cover w-full h-full" src={img5} />
            <button className="text-black bg-white py-3 px-6 font-cabinet tracking-wideaf font-bold text-md absolute bottom-16 left-1/2 -translate-x-1/2">
              MEN
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
