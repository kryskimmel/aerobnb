import React, {useEffect} from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";


const SpotDetailPage = () => {
    const {id} = useParams()

    const dispatch = useDispatch();


    const selectedSpot = useSelector(state => state.spots.currSpot);
    const ownerInfo = useSelector(state => state.spots.currSpot.Owner);
    const spotImages = useSelector(state => state.spots.currSpot.SpotImages);



    useEffect(() => {
        dispatch(spotActions.fetchSpotById(id))
    }, [dispatch]);

    const {
        address,
        avgStarRating,
        city,
        country,
        description,
        name,
        numReviews,
        price,
        state
    } = selectedSpot;


    const {
        firstName,
        lastName,
    } = ownerInfo;


    const previewImg = spotImages.find(spot => spot.preview)

    const filterAdditionalImgs = spotImages.filter((spot) => !spot.preview);
    console.log('ADDITIONAL IMAGES', filterAdditionalImgs)

    const additionalImgs = filterAdditionalImgs.map((image) => {
        return (<img key={image.id} src={image.url}></img>)
    })





    return (
        <div>
            <h1>{name}</h1>
            <h4>{city}, {state}, {country}</h4>
            <img src={previewImg.url}></img>
            {additionalImgs}


            <h2>Hosted by {firstName} {lastName}</h2>
            <h3><span>${price} night</span></h3>
            <h3>{avgStarRating}</h3>
            <h3>{numReviews} reviews</h3>
        </div>
    )
};


export default SpotDetailPage;
