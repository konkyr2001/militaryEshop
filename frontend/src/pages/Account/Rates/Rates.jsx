import { useEffect, useState } from "react";
import { getCheckoutsById } from "../../../services/checkout.js";
import { getProductsById, getReviewProduct } from "../../../services/products.js";
import Loading from "../../../components/Shared/Loading.jsx";
import SingleRating from "./SingleRating.jsx";
import Alert from "@mui/material/Alert";

function Reviews({ currentUser }) {
    const [reviewed, setReviewed] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [ratingAlert, setRatingAlert] = useState();

    useEffect(() => {
        async function getReviews() {
            const productIds = currentUser.ratings.map((rating) => rating.productId);
            const reviewed = await getReviewProduct(productIds);
            const reviews = [];
            for (const product of reviewed) {
                const { rating, ratingText,date } = currentUser.ratings.find((rating) => rating.productId == product.id);
                product.ratings = {
                    rating,
                    ratingText,
                    date,
                    userId: currentUser.id
                };
                reviews.push(product);
            }
            setReviewed(reviews);
        };
        setIsLoading(true);
        getReviews();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!ratingAlert) return;
        console.log("mpike")
        const timer = setTimeout(() => {
            setRatingAlert(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [ratingAlert]);

    if (isLoading) return <Loading />;

    if (reviewed && reviewed.length == 0) {
        return <span className="text-center">
            <p className="text-xl font-medium">You haven't made any ratings yet!</p>
        </span>
    }
    { console.log(reviewed) }
    return <ul className="w-full h-full overflow-auto">
        {ratingAlert && <Alert severity="success">{ratingAlert}</Alert>}
        {reviewed?.map(review =>
            <SingleRating key={review.id} review={review} reviewed={reviewed} setReviewed={setReviewed} setRatingAlert={setRatingAlert} />
        )}
    </ul>
};

export default Reviews;