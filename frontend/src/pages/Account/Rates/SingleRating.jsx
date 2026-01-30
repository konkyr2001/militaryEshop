import { useState } from "react";
import { deleteReview } from "../../../services/products";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const _SHOEPATH = "/src/assets/shoes/";
function SingleRating({ review, reviewed, setReviewed, setRatingAlert }) {
    const [alert, setAlert] = useState();
    const date = new Date(review.ratings.date);
    const dateText = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`

    useEffect(() => {
        if (!alert) return;

        const timer = setTimeout(() => {
            setAlert(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [alert]);

    function handleRemove() {
        async function removeProduct() {
            const deletedReview = await deleteReview(review.id, review.ratings.userId);
            if (deletedReview.found) {
                const copy = [...reviewed];
                copy.splice(copy.indexOf(review), 1);
                setReviewed(copy);
                setRatingAlert("Your rating has been removed!");
            }
        }

        removeProduct();
    }
    
    return <li className="border-b-2 border-gray-500 w-full relative">
        <div className="flex flex-col">
            <div className={`w-full p-4 flex items-center gap-5`}>
                <span className="min-w-32 flex justify-center items-center cursor-pointer">
                    <Link
                        to={`/review/${review.id}`}
                    >
                        <img src={`${_SHOEPATH}${review.icon}`} className="h-20" />
                    </Link>
                </span>
                <span>
                    <Link
                        to={`/review/${review.id}`}
                    >
                        <h2 className="text-base text-black font-tiktok font-light cursor-pointer">{review.title}</h2>
                    </Link>
                    <p className="text-sm text-gray-600"><Rating readonly={true} initialValue={review.ratings.rating} /></p>
                    <p className="text-sm text-gray-600">{dateText}</p>
                </span>
            </div>
            {review.ratings.ratingText && <span className="ml-10 mb-4 text-lg text-black font-bold">
                {review.ratings.ratingText}
            </span>}
            <span className="absolute top-1/2 -translate-y-1/2 right-16">
                <i onClick={handleRemove} className="fa-solid fa-trash cursor-pointer hover:scale-150 active:scale-110 transition-transform"></i>
            </span>
        </div>
    </li>
}

export default SingleRating;