import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import OpenModalButton from "../Modals/OpenModalButton";
import DeleteReviewModal from "../Modals/DeleteReviewModal";
import PostReviewModal from "../Modals/PostReviewModal";
import useModal from "../../context/OpenModalContext";
import { monthEquivalent } from "../../utilities/monthEquivalencies";



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

    console.log('curr spot reviews before return:', currSpotReviews)



    return (
        <>
            <div className="reviews-header">
                <p>
                    <i className="fa-solid fa-star" style={{color: "#000000"}}></i>
                    {currSpot?.avgStarRating ? currSpot.avgStarRating.toFixed(1) : "New"} • {currSpot?.numReviews ? currSpot.numReviews === 1 ? `${currSpot.numReviews} review` : `${currSpot.numReviews} reviews` : "0 reviews"}
                </p>
            </div>
            {console.log('curr spot reviews after return:', currSpotReviews)}
            {currSpot?.Owner && sessionUser && currSpotReviews && (
                <div className={currSpotReviews.length && ((currSpot?.Owner.id === sessionUser.id) || (currSpotReviews.find(review => review?.userId === sessionUser?.id))) ? "hide-buttons" : "show-button"}>
                    <OpenModalButton
                        buttonText="Post Your Review"
                        onButtonClick={() => {setOnModalContent(<PostReviewModal spotId={id} />)}}
                        modalComponent={<PostReviewModal />}
                    />
                </div>
            )}

            {currSpotReviews && currSpotReviews.map(review => {
                if (review && review?.User) {
                    return (
                        <div className="reviews" key={review.id}>
                            <ul>
                                <li style={{fontWeight:"bold"}}>{review.User?review.User.firstName:""}</li>
                                <li style={{color:"#989898"}}>{monthEquivalent(review.createdAt.slice(5,7))} {review.createdAt.slice(0,4)}</li>
                                <li>{review.review}</li>
                            </ul>
                            <div className={review?.userId === sessionUser?.id ? "show-button" : "hide-buttons"}>
                            <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={() => {setOnModalContent(<DeleteReviewModal reviewId={review.id} spotId={id}/>)}}
                                    modalComponent={<DeleteReviewModal />}
                                />
                            </div>
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
