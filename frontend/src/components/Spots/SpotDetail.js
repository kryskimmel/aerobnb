import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as spotActions from "../../store/spots";
import './css/SpotDetail.css';

const ShowDetail = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots);

     useEffect (() => {
        dispatch(spotActions.fetchSingleSpot(id))
     }, [dispatch, id])

     const {
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

     if (spot && spot.SpotImages) {
        const spotArray = Object.values(spot.SpotImages);

        previewImg = spotArray.find(image => image.preview);
        previewImg = previewImg.url

        const filterAdditionalImgs = spotArray.filter((image) => !image.preview);
        additionalImgs = filterAdditionalImgs.map((image) => {
            return (
                <img src={image.url} alt={name}></img>
            )
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
            <div className='single-spot-description'>
                {spot && spot.Owner && (
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                )}
                <p>{description}</p>
            </div>
            <div className='single-spot-info-box'>
                <p><span>${price}</span> night</p>
                <p><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span>{avgStarRating}</span></p>
                <p>{numReviews} reviews</p>
                <button onClick={() => {alert('Feature Coming Soon...')}}>Reserve</button>
            </div>
            <hr></hr>
            <div className='single-spot-reviews'>
                <p>Reviews here</p>
            </div>
        </div>
    )
};

export default ShowDetail;
