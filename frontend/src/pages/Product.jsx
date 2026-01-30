import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams, Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Item from "../components/Shared/Item";
import { createReviewToProduct, getProductById } from "../services/products";
import "./Product.css";

const _SHOEPATH = "/src/assets/shoes/";
function Product() {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [rating, setRating] = useState();
  const [ratingText, setRatingText] = useState();
  const [ratingOptions, setRatingOptions] = useState();
  const [item, setItem] = useState(null);
  const [currentUserRated, setCurrentUserRated] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getProduct() {
      const product = await getProductById(id);
      if (!product) return;
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
    }

    getProduct();
  }, [id]);

  useEffect(() => {
    const rated = item?.ratings.find((obj) => obj?.userId.id == user.id);
    setCurrentUserRated(rated);
  }, [item?.ratings, user.email]);

  async function handleForm(event) {
    event.preventDefault();
    if (!rating) return;

    const date = new Date(Date.now());
    const ratingInfo = {
      rating,
      ratingText,
      date: new Date
    }
    const createRating = await createReviewToProduct(item.id, user.id, ratingInfo);
    if (createRating) {
      window.location.reload();
    }
  }

  if (!item) {
    return;
  }
  console.log(item)
  return (
    <div className="w-3/5 m-auto pt-20">
      <div className="flex single-item">
        <Item
          id={item.id}
          icon={`${_SHOEPATH}${item.icon}`}
          title={item.title}
          oldPrice={item.oldPrice}
          currentPrice={item.currentPrice}
          discount={item.discount}
          ratingValue={item.rating}
          ratingAmount={item.ratingAmount}
          username={item.creator?.username}
          date={item?.publishedDate}
          containerClass={
            "bg-gray-200 h-[270px] w-[250px] ml-16 flex justify-center items-center relative"
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
        <p className="leading-relaxed text-lg tracking-wide text-justify">
          {item.description}
        </p>
        <h2></h2>
      </div>
      <div className={`pb-20`}>
        <h2 className="reviews text-4xl font-semibold border-b pb-2">Product Reviews</h2>
        {!currentUserRated && user.email && <form className="mt-10 flex flex-col gap-3 relative" onSubmit={(e) => handleForm(e)}>
          <label className="text-xl font-semibold">Rate this product:</label>
          <Rating
            className="absolute left-1/2 -translate-x-1/2"
            value={rating}
            onClick={setRating}
          />
          <textarea
            className="w-full hs-[50px] p-2 pr-14 border-2 rounded-md shadow-md"
            value={ratingText} onChange={(e) => setRatingText(e.target.value)}
            type="text" placeholder="Enter your review here..."
            title="Submit Review"
            rows={4}
          />
          <button
            type="submit"
            className={`${rating ? 'bg-blue-500' : 'bg-gray-500'} py-1 px-3 absolute bottom-2 right-3 
              rounded-md cursor-pointer`}>
            <i className="fa-solid fa-angle-right text-slate-100"></i>
          </button>
        </form>}
        {item?.ratings && item.ratings.map((rating) =>
          <div key={rating._id} className={`flex ${!rating.ratingText ? 'items-center' : ''} ratings border-[2px] mt-20 border-slate-200 p-4 gap-4 rounded shadow-md relative`}>
            <i className={`${rating.ratingText ? 'mt-2' : ''} fa-regular fa-user rounded-[50%] border-4 border-black w-10 h-10 pl-[1px] flex justify-center items-center text-xl`}></i>
            <div className={`flex flex-col ${rating.ratingText ? 'gap-4' : 'justify-center gap-x-0'} flex-1 mr-10`}>
              <div>
                <span className="flex items-center gap-2 relative">
                  <label className="text-lg text-bold text-black pt-1"><strong>{rating.userId.email}</strong></label>
                  <Rating readonly={true} initialValue={rating.rating} ></Rating>
                </span>
                <span className="text-[14px]">{(new Date(rating.date)).getDate() + ' / ' + (new Date(rating.date)).getMonth() + 1 + ' / ' + (new Date(rating.date)).getFullYear()}</span>
              </div>
              {true && <p className="text-md font-semibold">{rating.ratingText}</p>}
              {false && <textarea
                className="w-full hs-[50px] p-2 pr-14 border-2 rounded-md shadow-md"
                value={ratingText} onChange={(e) => setRatingText(e.target.value)}
                type="text" placeholder={`${!rating.ratingText ? '' : rating.ratingText}`}
                title="Submit Review"
                rows={4}
              />}

            </div>
            {currentUserRated && <span className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer">
              <i onClick={(e) => setRatingOptions((prev) => !prev)} className="fa-solid fa-ellipsis relative">
                {ratingOptions && <div className="absolute top-8 right-0 w-[100px] left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-gray-200"></div>
                    </div>
                    <span className="flex flex-col text-center bg-gray-200 rounded shadow-md w-full">
                      <p className="hover:bg-gray-300 transition-transform p-2 border-b-2 rounded">Change</p>
                      <p className="hover:bg-gray-300 transition-transform p-2 rounded">Delete</p>
                    </span>
                  </div>
                </div>}
              </i>
            </span>}
          </div>
        )}
      </div>
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
