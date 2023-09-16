import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import useModal from "../../context/OpenModalContext";
import './css/PostReviewModal.css'





const PostReviewModal = ({spotId}) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState();
    let [stars, setStars] = useState(1);
    const {closeModal} = useModal();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewReq = {
            review,
            stars : parseInt(stars)
        };
        console.log(reviewReq, ':reviewReq')
        dispatch(reviewActions.addAReview(reviewReq, spotId));
        closeModal();
    };


    return (
        <div className="overlay">
            <div className="post-review-modal">
                <form onSubmit={handleSubmit}>
                    <h1>How was your stay?</h1>
                    <textarea
                        className="text-area"
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <input
                        type="range"
                        max="5"
                        step="1"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                    ></input>
                    <button type="submit"  className="cannot-submit-button">Submit Your Review</button>
                </form>
            </div>
        </div>
    )
}

export default PostReviewModal;
