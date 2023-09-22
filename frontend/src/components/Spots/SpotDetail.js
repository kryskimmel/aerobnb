import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { monthEquivalent } from "../../utilities/monthEquivalencies";
import OpenModalButton from "../Modals/OpenModalButton";
import useModal from "../../context/OpenModalContext";
import DeleteReviewModal from "../Modals/DeleteReviewModal";
import PostReviewModal from "../Modals/PostReviewModal";
import "./css/SpotDetail.css"


function SpotDetail() {
    const dispatch = useDispatch();
    const currSpot = useSelector(state => state.spots);
    const currSpotReviews = useSelector(state => Object.values(state.reviews));
    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();
    const {setOnModalContent} = useModal();


    useEffect(() => {
        dispatch(spotActions.fetchSingleSpot(id));
        dispatch(reviewActions.fetchSpotReviews(id))
    }, [dispatch, id])


    const previewImg = currSpot && currSpot.SpotImages && currSpot.SpotImages.find(image => image.preview === true)
    const filteredAdditionalImgs = currSpot && currSpot.SpotImages && currSpot.SpotImages.filter((image => image.preview === false))
    const additionalImgs = filteredAdditionalImgs && filteredAdditionalImgs.map((additionalImg) => {
        return (
            <img src={additionalImg && additionalImg.url} alt={currSpot && currSpot.name} key={additionalImg && additionalImg.id} className="additional-imgs"></img>
        )
    })

    return (
        <div className="spot-container">
            <div className="spot-header">
                <h1>{currSpot.name}</h1>
                <h2>{currSpot.city}, {currSpot.state}</h2>
            </div>

            <div className="imgs-div">
                <div className="preview-img-div">
                    <img src={previewImg && previewImg.url} alt={currSpot.name} className="preview-img"></img>
                </div>
                <div className="additional-imgs-div">
                    {additionalImgs}
                </div>
            </div>

            <div className="spot-info-container">
                <div className="spot-description">
                    <h2>{`Hosted by ${currSpot.Owner?currSpot.Owner.firstName:""} ${currSpot.Owner?currSpot.Owner.lastName:""}`}</h2>
                    <p>{currSpot.description}</p>
                </div>
                <div className="spot-info-box">
                    <ul>
                        <li>${currSpot.price} night</li>
                        <li><i className="fa-solid fa-star" style={{color: "#000000"}}></i>{currSpot.avgStarRating ? currSpot.avgStarRating : "New"} • {currSpot.numReviews && currSpot.numReviews === 1 ? `${currSpot.numReviews} review` : `${currSpot.numReviews} reviews`}</li>
                    </ul>
                    <button className="reserve-button" onClick={() => {alert("Feature Coming Soon...")}}>Reserve</button>
                </div>
            </div>

            <hr></hr>

            <div className="reviews-header">
                <p><i className="fa-solid fa-star" style={{color: "#000000"}}></i>{currSpot.avgStarRating ? currSpot.avgStarRating : "New"} • {currSpot.numReviews && currSpot.numReviews === 1 ? `${currSpot.numReviews} review` : `${currSpot.numReviews} reviews`}</p>
            </div>

            {currSpot.Owner && sessionUser && (
                <div className={currSpot.Owner.id !== sessionUser.id ? "show-button" : "hide-buttons"}>
                    <OpenModalButton
                        buttonText="Post Your Review"
                        onButtonClick={() => {setOnModalContent(<PostReviewModal spotId={id} />)}}
                        modalComponent={<PostReviewModal />}
                    />
                </div>
            )}

            {sessionUser && currSpotReviews && currSpotReviews.map((review) => {
                if (review && review.User) {
                    return (
                        <div className="reviews">
                            <ul>
                                <li style={{fontWeight:"bold"}}>{review.User?review.User.firstName:""}</li>
                                <li style={{color:"#989898"}}>{monthEquivalent(review.createdAt.slice(5,7))} {review.createdAt.slice(0,4)}</li>
                                <li>{review.review}</li>
                            </ul>
                            <div className={review.userId === sessionUser.id ? "show-button" : "hide-buttons"}>
                            <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={() => {setOnModalContent(<DeleteReviewModal reviewId={review.id} spotId={id}/>)}}
                                    modalComponent={<DeleteReviewModal />}
                                />
                            </div>
                        </div>
                    )
                }

            })}
        </div>
    )
}

export default SpotDetail;
