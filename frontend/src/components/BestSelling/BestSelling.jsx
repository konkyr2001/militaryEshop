import shoe1 from "../../assets/shoes/cyan-shoe.png";
import shoe2 from "../../assets/shoes/blue-shoe.png";
import shoe3 from "../../assets/shoes/red-shoe.png";
import shoe4 from "../../assets/shoes/white-shoe.png";
import Item from "../Shared/Item";
import "./BestSelling.css";
import { getBestSellers } from "../../services/products";
import { useState } from "react";
import { useEffect } from "react";
function BestSelling() {
  const [bestSellers, setBestSellers] = useState();
  useEffect(() => {
    async function get4BestProducts() {
      try {
        const best4Prod = await getBestSellers();
        if (best4Prod) {
          setBestSellers(best4Prod);
        }
      } catch (error) {
        console.log(error.message);
      }

    };
    get4BestProducts();
  }, []);

  if (!bestSellers) {
    return;
  }

  return (
    <div className="mt-40 font-cabinet pt-10">
      <div className="flex w-full">
        <h1 className="text-black font-cabinetMedium text-4xl">BEST SELLING</h1>
        <ul className="flex gap-x-14 ml-auto mr-4">
          <li>
            <button>
              <p className="font-bold">PREV</p>
              <div className="arrow-left"></div>
              <span className="horizontal-line w-9"></span>
            </button>
          </li>
          <li>
            <button>
              <p className="font-bold">NEXT</p>
              <span className="horizontal-line w-9"></span>
              <div className="arrow-right"></div>
            </button>
          </li>
        </ul>
      </div>
      <section className="flex flex-col w-full">
        <ul className="flex gap-x-20 justify-center py-20">
          {bestSellers?.map((item) =>
            <li className="w-[270px]" key={item.id}>
              <Item
                id={item.id}
                icon={item.icon}
                title={item.title}
                currentPrice={item.currentPrice}
                ratingValue={item.rating}
                ratingAmount={item.ratingAmount}
              />
            </li>
          )}
        </ul>
        <button className="bg-black py-2 px-5 w-fit text-white font-cabinet font-semibold m-auto">
          SHOP NOW
        </button>
      </section>
    </div>
  );
}

export default BestSelling;
