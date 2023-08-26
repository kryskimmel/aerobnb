import React, {useEffect} from "react";
import * as sessionActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";


const SpotDetailPage = () => {
    const {id} = useParams()

    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));


    const selectedSpot = spots.find(spot => spot.id === parseInt(id))
    console.log(selectedSpot)

    const {
        address,
        avgRating,
        city,
        country,
        description,
        lat,
        lng,
        name,
        previewImage,
        price,
        state
    } = selectedSpot


    useEffect(() => {
        dispatch(sessionActions.fetchAllSpots())
    }, [dispatch]);


    return (
        <div>
            <h1>{name}</h1>
            <h4>{city}, {state}, {country}</h4>
            <img src={previewImage}></img>
            <h2>Hosted by</h2>
            <h3><span>${price} night</span></h3>
            <h3>{avgRating}</h3>
        </div>
    )
};


export default SpotDetailPage;
