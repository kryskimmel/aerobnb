import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as spotActions from "../../store/spots";
import './css/LandingPage.css';


const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => Object.values(state.spots));

    useEffect(() => {
        dispatch(spotActions.fetchSpots())
    }, [dispatch]);


    const allSpots = spots.map((spot) => {
        const {
            id,
            name,
            city,
            state,
            price,
            previewImage,
            avgRating
        } = spot

        return (
            <div key={spot.id} className='spot-card' onClick={() => {history.push(`/spots/${id}`)}}>
                <img src={previewImage} alt={name}></img>
                <div key={spot.id} className='spot-info'>
                    <p className='location-info'>{city}, {state}</p>
                    <p className='rating-info'><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span> {avgRating}</span></p>
                    <p className='price-info'><span>${price}</span> night</p>
                </div>
            </div>
        )
    })


    return (
        <div className='spots-container'>
            {allSpots}
        </div>
    )
}

export default LandingPage;
