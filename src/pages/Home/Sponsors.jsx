import img1 from "../../assets/Rectangle 16.png";
import img2 from "../../assets/Rectangle 17.png";

function Sponsors() {
  return (
    <div className="mt-40 border-t-2 border-gray-300 relative pt-40 flex justify-around">
      <div className="relative w-fit h-fit">
        <img src={img1} />
        <h1 className="absolute bottom-40 left-10 text-white text-2xl font-cabinetMedium font-bold">
          FAMOUS MUICHES
        </h1>
        <button className="absolute bottom-24 left-10 text-white font-cabinet border-[1px] py-1 px-3 border-white">
          SHOP NOW
        </button>
      </div>
      <div className="relative mt-40 w-fit h-fit">
        <img src={img2} />
        <h1 className="absolute bottom-40 left-10 text-white text-2xl font-cabinetMedium font-bold">
          SPECIAL COLLECTION
        </h1>
        <button className="absolute bottom-24 left-10 text-white font-cabinet border-[1px] py-1 px-3 border-white">
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

export default Sponsors;
