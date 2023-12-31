import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import OpenModalButton from "../Modals/OpenModalButton";
import DeleteReviewModal from "../Modals/DeleteReviewModal";
import PostReviewModal from "../Modals/PostReviewModal";
import useModal from "../../context/OpenModalContext";
import { monthEquivalent } from "../../utilities/monthEquivalencies";
import './css/Review.css'



function Review () {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reviewActions.fetchSpotReviews(id))
    }, [dispatch, id])

    const currSpot = useSelector(state => state.spots[parseInt(id)]);
    const currSpotReviews = Object.values(useSelector(state => state.reviews));
    const sessionUser = useSelector(state => state.session.user);
    const {setOnModalContent} = useModal();

    const sortedReviews = currSpotReviews.sort((a, b) => b.createdAt - a.createdAt);
    console.log('the sorted review variable', sortedReviews)
    const reversedSortReviews = [...sortedReviews].reverse();





    return (
        <>
            <div className="reviews-header">
                <p style={{fontWeight:"500", fontSize:"24px"}}>
                    <i className="fa-solid fa-star" style={{color: "#000000"}}></i>
                    {currSpotReviews.length > 0 ? (currSpotReviews.reduce((sum, count) => sum + count.stars, 0) / currSpotReviews.length).toFixed(1) : "New"} {!currSpotReviews?.length ? "" : currSpotReviews?.length === 1 ? `• ${currSpotReviews.length} review` : `• ${currSpotReviews.length} reviews`}
                </p>
            </div>
            {currSpot?.Owner && sessionUser && currSpotReviews && (
                <div className={currSpot?.Owner.id === sessionUser.id || currSpotReviews.length && ((currSpot?.Owner.id === sessionUser.id) || (currSpotReviews.find(review => review?.userId === sessionUser?.id))) ? "hide-buttons" : "show-button"}>
                    <OpenModalButton
                        buttonText="Post Your Review"
                        onButtonClick={() => {setOnModalContent(<PostReviewModal spotId={parseInt(id)} />)}}
                        modalComponent={<PostReviewModal />}
                    />
                    {!currSpotReviews.length && currSpot?.Owner.id !== sessionUser.id ? <p>Be the first to post a review!</p> : ""}
                </div>
            )}

            {currSpotReviews && sortedReviews && reversedSortReviews?.map(review => {
                if (review && review?.User) {
                    return (
                        <div className="reviews" key={review.id} style={{paddingBottom:'10px'}}>
                            <ul style={{listStyle:'none', padding:'0'}}>
                                <li style={{fontWeight:"bold"}}>{review.User?review.User.firstName:""}</li>
                                <li style={{color:"#989898"}}>{monthEquivalent(review.createdAt.slice(5,7))} {review.createdAt.slice(0,4)}</li>
                                <li>{review.review}</li>
                                <div className={review?.userId === sessionUser?.id ? "show-button" : "hide-buttons"} id="delete-review-button">
                                    <OpenModalButton
                                        buttonText="Delete"
                                        onButtonClick={() => {setOnModalContent(<DeleteReviewModal reviewId={review.id} spotId={parseInt(id)}/>)}}
                                        modalComponent={<DeleteReviewModal />}
                                    />
                                </div>
                            </ul>

                        </div>
                    )
                } else {
                    return null
                }
            })}
        </>
    )
}

export default Review;
