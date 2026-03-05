import Item from "../Shared/Item";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products";
import Loading from "../Shared/Loading";

function ShopSection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    async function getProducts() {
      const allProducts = await getAllProducts();
      if (allProducts.found) {
        setProducts(allProducts.products);
        setError(false);
      } else {
        setError(true);
        setProducts([]);
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    getProducts();
  }, []);

  if (isLoading) {
    return <Loading display='block' />
  }
  if (error || products.length == 0) {
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
      {products.length == 0 && <h1 className="text-3xl font-bold text-gray-800 mb-2">
        There are currently 0 products published yet!
      </h1>}
    </div>
  }

  if (error) {
    return <div className="flex flex-col h-[300px] gap-2 justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-500 mb-6">
        We’re sorry, but an unexpected error has occurred. Please try again
        or return to the homepage.
      </p>
    </div>
  }

  return (
    <>
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
      <section className="flex flex-col justify-center items-center gap-y-12 w-full pt-20">
        <ul className="flex flex-wrap gap-x-20 gap-y-6 justify-center max-w-[1400px]">
          {products.map((product, index) => {
            return (
              <li className="w-[270px]" key={product.id}>
                <Item
                  id={product.id}
                  icon={product.icon.url}
                  title={product.title}
                  oldPrice={product.oldPrice}
                  currentPrice={product.currentPrice}
                  discount={product.discount}
                  ratingsSum={product.ratingsSum}
                  ratingsCounter={product.ratingsCounter}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default ShopSection;
