import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams, useLocation, Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Item from "../components/Shared/Item";
import { getProductById } from "../services/products";

const _SHOEPATH = "/src/assets/shoes/";
function Product() {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getProduct() {
      const product = await getProductById(id);
      console.log(product)
      setItem(product);
    }

    getProduct();
  }, [id]);

  if (!item) {
    return;
  }

  return (
    <div className="w-3/5 m-auto mt-40">
      <div className="flex">
        <Item
          id={item.id}
          icon={`${_SHOEPATH}${item.icon}`}
          title={item.title}
          oldPrice={item.oldPrice}
          currentPrice={item.currentPrice}
          discount={item.discount}
          ratingValue={item.rating}
          ratingAmount={item.ratingAmount}
          containerClass={
            "bg-gray-200 h-[270px] w-[250px] ml-16 flex justify-center items-center relative"
          }
          listClass={"flex flex-col gap-2 pt-3 ml-auto text-xl mr-10"}
          titleClass={"text-[40px] font-normal mb-10"}
          singlePost={true}
        />
      </div>
      {user.email && <div className="flex">
        <Link className="w-[90%] m-auto" to={`/cart/${item.id}`}>
          <button className="bg-green-500 w-full mx-auto mt-2 px-7 p-1 rounded-md text-white font-cabinet shadow-md hover:bg-green-600 transition-all">
            <i className="fa-solid fa-bolt text-yellow-300"></i> BUY NOW
          </button>
        </Link>
      </div>}
      <div className="flex-1 text-gray-800 space-y-6 mt-16">
        <h2 className="text-4xl font-semibold border-b pb-2">Product Description</h2>
        <p className="leading-relaxed text-lg tracking-wide text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
}

export default Product;
