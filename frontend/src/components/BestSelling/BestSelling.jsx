import shoe1 from "../../assets/shoes/cyan-shoe.png";
import shoe2 from "../../assets/shoes/blue-shoe.png";
import shoe3 from "../../assets/shoes/red-shoe.png";
import shoe4 from "../../assets/shoes/white-shoe.png";
import Item from "../Shared/Item";
import "./BestSelling.css";
import { getBestSellers } from "../../services/products";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../Shared/Loading";
function BestSelling() {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function get4BestProducts() {
      try {
        const best4Prod = await getBestSellers();
        if (best4Prod) {
          setBestSellers(best4Prod);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
      setIsLoading(false);

    };

    setIsLoading(true);
    get4BestProducts();
  }, []);

  if (isLoading) {
    return <Loading display='block' />
  }

  if (error || bestSellers.length == 0) {
    return <div className="flex flex-col h-[300px] gap-2 justify-center items-center">
      {error && <>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">
          We’re sorry, but an unexpected error has occurred. Please try again
          or return to the homepage.
        </p>
      </>}
      {bestSellers.length == 0 && <h1 className="text-3xl font-bold text-gray-800 mb-2">
        No best sellers product yet!
      </h1>}
    </div>
  }

  return (
    <>
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
                icon={item.icon.url}
                title={item.title}
                currentPrice={item.currentPrice}
                ratingsSum={item.ratingsSum}
                ratingsCounter={item.ratingsCounter}
              />
            </li>
          )}
        </ul>
        <button className="bg-black py-2 px-5 w-fit text-white font-cabinet font-semibold m-auto">
          SHOP NOW
        </button>
      </section>
    </>
  );
}

export default BestSelling;
