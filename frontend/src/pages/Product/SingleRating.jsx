import { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { deleteReview } from "../../services/products";

function SingleRating({ rating, itemId, userId, setRatingAlert, reviews, setReviewsObj }) {
    const [ratingOptions, setRatingOptions] = useState(null);
    const menuRef = useRef();
    const iconRef = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target) &&
                iconRef.current && !iconRef.current.contains(e.target)) {
                setRatingOptions(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside, true); // <-- capture mode
        return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, []);

    async function handleDelete(rating) {
        if (confirm("Are you sure you want to delete your review?")) {
            const deletedReview = await deleteReview(itemId, rating.rating, userId);
            if (deletedReview.found) {
                setRatingAlert({
                    message: "Your rating has been removed!",
                    severity: "success"
                });
                setReviewsObj(prev => ({
                    sum: prev.sum - rating.rating,
                    counter: prev.counter - 1,
                    reviews: prev.reviews.filter(r => r._id !== rating._id)
                }));
            }
        }
    }

    return <div className={`flex ${!rating.ratingText ? 'items-center' : ''} ratings border-[2px] mt-20 border-slate-200 p-4 gap-4 rounded shadow-md relative`}>
        <i className={`${rating.ratingText ? 'mt-2' : ''} fa-regular fa-user rounded-[50%] border-4 border-black w-10 h-10 pl-[1px] flex justify-center items-center text-xl`}></i>
        <div className={`flex flex-col ${rating.ratingText ? 'gap-4' : 'justify-center gap-x-0'} flex-1 mr-10`}>
            <div>
                <span className="flex items-center gap-2 relative">
                    <label className="text-lg text-bold text-black pt-1"><strong>{rating.user.email}</strong></label>
                    <Rating allowFraction readonly={true} initialValue={rating.rating} ></Rating>
                </span>
                <span className="text-[14px]">{(new Date(rating.date)).getDate() + ' / ' + ((new Date(rating.date)).getMonth() + 1) + ' / ' + (new Date(rating.date)).getFullYear()}</span>
            </div>
            <p className="text-md font-semibold">{rating.ratingText}</p>
        </div>
        {rating.user.id == userId && <span className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer">
            <i
                ref={iconRef}
                onClick={(e) => {
                    setRatingOptions(prev => prev === rating._id ? null : rating._id);
                }}
                className="fa-solid fa-ellipsis relative"
            >
                {ratingOptions && <div
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-8 right-0 w-[100px] left-1/2 -translate-x-1/2"
                >

                    <div className="relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-gray-200"></div>
                        </div>
                        <span className="flex flex-col text-center bg-gray-200 rounded shadow-md w-full">
                            <p onClick={(e) => handleDelete(rating)} className="hover:bg-gray-300 transition-transform p-2 rounded">Delete</p>
                        </span>
                    </div>
                </div>}
            </i>
        </span>}
    </div>
}

export default SingleRating;