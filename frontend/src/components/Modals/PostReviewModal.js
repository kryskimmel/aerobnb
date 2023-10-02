import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import useModal from "../../context/OpenModalContext";
import './css/PostReviewModal.css'
import {FaStar} from "react-icons/fa";
import '../../utilities/StarRating.css';



const PostReviewModal = ({spotId}) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    let [stars, setStars] = useState(null);
    const [hover, setHover] = useState(null);
    const {closeModal} = useModal();
    const history = useHistory();



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reviewActions.addAReview(review, parseInt(stars), spotId))
        .then(() => {
          // After the review is added, fetch spot reviews to update the count
          dispatch(reviewActions.fetchSpotReviews(spotId));
        })
        closeModal();
    };



    return (
        <div className="overlay">
            <div className="post-review-modal">
                <div className="form-div">
                    <form onSubmit={handleSubmit}>
                        <h1>How was your stay?</h1>
                        <textarea
                            className="text-area"
                            placeholder="Leave your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        <div className="star-rating-div">
                        <div>
                        {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        console.log(stars, ':the current rating')
                        return (
                            <label key={i}>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={ratingValue}
                                    onClick={() => setStars(ratingValue)}
                                    />
                                <FaStar
                                    className='star'
                                    color={ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"}
                                    size={20}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    />
                            </label>
                            )
                        })}
                        </div>
                        <div> Stars</div>
                        </div>
                        <button type="submit"  className="cannot-submit-button">Submit Your Review</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostReviewModal;
