import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { monthEquivalent } from '../../utilities/monthEquivalencies';
import OpenModalButton from '../Modals/OpenModalButton';
import DeleteReviewModal from '../Modals/DeleteReviewModal';
import useModal from '../../context/OpenModalContext';
import './css/SpotDetail.css';

const ShowDetail = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots);
    const reviews = useSelector(state => state.reviews);
    const sessionUser = useSelector(state => state.session.user);
    const {setOnModalContent, setOnModalClose} = useModal();
    const [reviewId, setReviewId] = useState();

     useEffect (() => {
        dispatch(spotActions.fetchSingleSpot(id))
        dispatch(reviewActions.fetchSpotReviews(id))
     }, [dispatch, id])

     const{
        avgStarRating,
        city,
        country,
        description,
        name,
        numReviews,
        price,
        state,
     } = spot;

    let previewImg;
    let additionalImgs;

    const handleModalOpen = () => {
        setOnModalContent(<DeleteReviewModal spotId={id}/>);
    };

    const reviewsText = (numReviews) => {
        if (numReviews === 0) return 'New';
        if (numReviews === 1) return 'Review';
        if (numReviews > 1) return 'Reviews';
    }

     if (spot && spot.SpotImages) {
        const spotArray = Object.values(spot.SpotImages);

        previewImg = spotArray.find(image => image.preview);
        previewImg = previewImg.url

        const filterAdditionalImgs = spotArray.filter((image) => !image.preview);
        additionalImgs = filterAdditionalImgs.map((image) => {
            return (
                <img src={image.url} alt={name} className='additional-imgs'></img>
            )
       })
     };



    let reviewText;

    if (reviews) {
        const reviewsArray = Object.values(reviews);
        reviewText = reviewsArray.map((eachReview) => {
            if (eachReview && eachReview.User && sessionUser) {
                const year = eachReview.createdAt.slice(0, 4);
                const month = eachReview.createdAt.slice(5,7);

                const buttonDivClassName = sessionUser.id === eachReview.userId ? "show-buttons" : "hide-buttons";

                return (
                    <div className='each-review-div'>
                        <h3>{eachReview.User.firstName}</h3>
                        <h4 style={{color:"#999999", fontWeight:"500"}}>{monthEquivalent(month)} {year}</h4>
                        <p>{eachReview.review}</p>
                        <div className={buttonDivClassName} id={`review-${eachReview.id}`} onClick={() => {setReviewId(eachReview.id)}}>
                            <OpenModalButton
                                buttonText="Update"
                                onButtonClick
                                modalComponent
                            />
                            <OpenModalButton
                                buttonText="Delete"
                                onButtonClick={handleModalOpen}
                                modalComponent={<DeleteReviewModal />}
                            />
                        </div>
                    </div>
                )
            }

        })
    };


    return (
        <div className='single-spot-container'>
            <div className='single-spot-info-header'>
                <h1>{name}</h1>
                <h2>{city}, {state}, {country}</h2>
            </div>
            <div className='single-spot-imgs'>
                <img className="preview-image" src={previewImg} alt={name}></img>
                {additionalImgs}
            </div>
            <div className='single-spot-info-section'>
                <div className='single-spot-description'>
                    {spot && spot.Owner && (
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    )}
                    <p>{description}</p>
                </div>
                <div className='single-spot-info-box'>
                    <p style={{textAlign:"left", padding:"0 25px"}}><span style={{fontSize:"20px"}}>${price}</span> night</p>
                    <p style={{textAlign:"right", padding:"0 25px"}}><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span>{avgStarRating}</span> {numReviews ? `• ${numReviews} `: ""} {reviewsText(numReviews)}</p>
                    <button className='reserve-button' onClick={() => {alert('Feature Coming Soon...')}}>Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='single-spot-reviews'>
                <h2><i className="fa-solid fa-star" style={{color: "#000000"}}></i>{`${avgStarRating ? avgStarRating : ""} ${numReviews ? `• ${numReviews} ` : ""} ${reviewsText(numReviews)}`}</h2>
                {reviewText}
            </div>
        </div>
    )
};

export default ShowDetail;
