import SportShoe from "../../assets/SportShoes.png";

function ShopAll() {
  return (
    <div className="h-[70vh] font-teko m-auto flex items-center justify-center relative">
      <p className="absolute text-3xl left-60 top-20 tracking-[.4rem]">ADJUSTABLE</p>
      <h1 className="text-gray-300 text-[18rem] font-extrabold">SHOP ALL</h1>
      <div className="absolute">
        <img className="cursor-default" src={SportShoe} />
        <div className="w-[400px] h-10 absolute blur-[45px] bg-black bottom-0 -left-10"></div>
      </div>

      <p className="absolute text-3xl right-60 bottom-20 tracking-[.4rem]">SOFT PAD</p>
    </div>
  );
}

export default ShopAll;
