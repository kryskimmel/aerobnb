import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviews";
import useModal from "../../context/OpenModalContext";
import './css/PostReviewModal.css'





const PostReviewModal = () => {
    return (
        <div className="overlay">
            <div className="post-review-modal">
                <h1>How was your stay?</h1>
                <textarea className="text-area" placeholder="Leave your review here..."></textarea>
                <input
                type="range"
                max="5"
                step="1"
                ></input>
                <button type="submit" disabled className="cannot-submit-button">Submit Your Review</button>
            </div>
        </div>
    )
}

export default PostReviewModal;
