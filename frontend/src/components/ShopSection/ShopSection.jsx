import Item from "../Shared/Item";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products";

const _SHOEPATH = "/src/assets/shoes/";
// const _SHOEPATH = "../../assets/shoes/";

function ShopSection() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const allProducts = await getAllProducts();
      if (allProducts.found) {
        setProducts(allProducts.products);
      }
    }

    getProducts();
  }, []);
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
      <section className="flex flex-col justify-center items-center gap-y-12 w-full pt-20">
        <ul className="flex flex-wrap gap-x-20 justify-center max-w-[1400px]">
          {products.map((product, index) => {
            return (
              <li className="w-[270px]" key={product.id}>
                <Item
                  id={product.id}
                  icon={`${_SHOEPATH}${product.icon}`}
                  title={product.title}
                  oldPrice={product.oldPrice}
                  currentPrice={product.currentPrice}
                  discount={product.discount}
                  ratingValue={product.rating}
                  ratingAmount={product.ratingAmount}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default ShopSection;
