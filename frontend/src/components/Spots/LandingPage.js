import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as spotActions from "../../store/spots";
import DeleteSpotModal from '../Modals/DeleteSpotModal';
import useModal from '../../context/OpenModalContext';
import './css/LandingPage.css';


const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => Object.values(state.spots));

    useEffect(() => {
        dispatch(spotActions.fetchSpots());
    }, [dispatch]);


    const landingPage = spots.map(spot => {

        let {
            id,
            previewImage,
            name,
            city,
            state,
            avgRating,
            price
        } = spot;

        let randomId = (Math.random() * 100000).toFixed(0);

        return (
            <div key={spot && (randomId)} className='spot-card' onClick={() => {history.push(`/spots/${spot && (id)}`)}}>
                <img src={spot && (previewImage)} alt={spot && (name)} className='images' title={name}></img>
                <div key={spot && (id)} className='spot-info'>
                    <p className='location-info'>{spot && (city)}, {spot && (state)}</p>
                    <p className='rating-info'><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span>{avgRating ? avgRating.toFixed(1) : "New"}</span></p>
                    <p className='price-info'><span>${spot && (price)}</span> night</p>
                </div>
            </div>
        )
    });

    return (
            <div className='spots-container'>
               {landingPage}
            </div>

    )

}

export default LandingPage;
