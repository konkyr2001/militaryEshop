import { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { createReviewToProduct, deleteReview } from "../../services/products";
import Alert from "@mui/material/Alert";
import SingleRating from "./SingleRating";

function RatingSection({ reviewsObj, setReviewsObj, user, setUser, item }) {
    const [currentUserRated, setCurrentUserRated] = useState();
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState('');
    const [ratingAlert, setRatingAlert] = useState({
        message: '',
        severity: '',
    });

    useEffect(() => {
        const rated = reviewsObj.reviews.find((obj) => obj?.user.id == user.id);
        setCurrentUserRated(rated);
    }, [user?.email, reviewsObj]);

    useEffect(() => {
        if (!ratingAlert) return;

        const timer = setTimeout(() => {
            setRatingAlert({
                message: '',
                severity: ''
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [ratingAlert]);

    async function handleForm(event) {
        event.preventDefault();
        if (!rating) return;

        const date = new Date(Date.now());
        const ratingInfo = {
            rating,
            ratingText,
            date
        }
        const createRating = await createReviewToProduct(item.id, user.id, ratingInfo);
        if (createRating.found) {
            setCurrentUserRated(true);
            const newReview = {
                _id: createRating.data._id,
                date: createRating.data.date,
                rating: createRating.data.rating,
                ratingText: createRating.data.ratingText,
                user: {
                    id: createRating.data.userId,
                    email: user.email
                }
            }
            setReviewsObj(prev => ({
                sum: prev.sum + newReview.rating,
                counter: prev.counter + 1,
                reviews: [
                    ...prev.reviews,
                    newReview,
                ]
            }));
            setRatingAlert({
                message: "Your review has been submitted!",
                severity: "success"
            });
            setUser(prev => ({
                ...prev,
                ratings: [
                    ...prev.ratings,
                    {
                        date: newReview.date,
                        product: item.id,
                        rating: newReview.rating,
                        ratingText: newReview.ratingText,
                        _id: newReview._id
                    }
                ]
            }));

            setRating(0);
            setRatingText('');
        }
    }
    return <div className={`pb-20`} id="ratings">
        {ratingAlert.message && <Alert severity={ratingAlert.severity}>{ratingAlert.message}</Alert>}
        <h2 className="reviews text-4xl font-semibold border-b pb-2">Product Reviews</h2>
        {!currentUserRated && user?.email && <form className="mt-10 flex flex-col gap-3 relative" onSubmit={(e) => handleForm(e)}>
            <label className="text-xl font-semibold">Rate this product:</label>
            <Rating
                className="absolute left-1/2 -translate-x-1/2"
                value={rating}
                onClick={setRating}
                transition={true}
                allowFraction
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
        {reviewsObj.counter > 0 && reviewsObj.reviews.map((rating) =>
            <SingleRating key={rating._id} itemId={item.id} rating={rating} userId={user.id} setRatingAlert={setRatingAlert} reviews={reviewsObj.reviews} setReviewsObj={setReviewsObj} />
        )}
    </div>
}

export default RatingSection;