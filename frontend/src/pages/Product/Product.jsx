import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams, Link, Navigate } from "react-router-dom";
import Item from "../../components/Shared/Item";
import { getProductById } from "../../services/products";
import "./Product.css";
import RatingSection from "./RatingSection";

function Product() {
  const [redirect404, setRedirect404] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviewsObj, setReviewsObj] = useState({
    sum: 0,
    counter: 0,
    reviews: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setReviewsObj({
      sum: item?.ratingsSum,
      counter: item?.ratingsCounter,
      reviews: item?.ratings || []
    })
  }, [item]);

  useEffect(() => {
    async function getProduct() {
      try {
        const product = await getProductById(id);
        if (!product) {
          setRedirect404(true);
        }
        if (!user.id) {
          setItem(product);
          return;
        }
        product.creator.username = product.creator.email.split("@")[0];
        const date = new Date(product.createdAt);
        product.publishedDate = {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }
        setItem(product);
      } catch (error) {
        setRedirect404(true);
      }
    }

    getProduct();
  }, [id]);

  if (redirect404) {
    return <Navigate to="/error" replace />;
  }

  if (!item) {
    return;
  }

  return (
    <div className="w-3/5 m-auto pt-20">
      <div className="flex single-item">
        <Item
          id={item.id}
          icon={item.icon.url}
          title={item.title}
          oldPrice={item.oldPrice}
          currentPrice={item.currentPrice}
          discount={item.discount}
          ratingsSum={reviewsObj.sum}
          ratingsCounter={reviewsObj.counter}
          username={item.creator?.username}
          date={item?.publishedDate}
          containerClass={
            "bg-gray-200 h-[260px] w-[260px] ml-16 flex justify-center items-center relative"
          }
          listClass={"flex flex-col gap-2 pt-3 ml-auto text-xl mr-16"}
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
        {item.description && <p className="leading-relaxed text-lg tracking-wide text-justify">
          {item.description}
        </p>}
        {!item.description && <p className="leading-relaxed text-lg tracking-wide text-justify">
          Product has no description
        </p>}
        <h2></h2>
      </div>
      <RatingSection
        reviewsObj={reviewsObj}
        setReviewsObj={setReviewsObj}
        user={user}
        setUser={setUser}
        item={item}
      />
      <div>
        {item.creator?.username && <span className="flex gap-1 text-gray-400">
          <label>By: {item.creator?.username}</label>
          <label>-</label>
          <label>
            Date:
            {` ${item.publishedDate.day} ${new Date(item.createdAt).toLocaleString("en-US", { month: "long" })} ${item.publishedDate.year}`}
          </label>
        </span>
        }
      </div>
    </div>
  );
}

export default Product;
