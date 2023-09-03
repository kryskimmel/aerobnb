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
    const [spotId, setSpotId] = useState();

    useEffect(() => {
        dispatch(spotActions.fetchSpots());
        console.log('tjhe curr spot id', spotId)
    }, [dispatch, spotId]);


    const landingPage = spots.map(spot => {
        return (
            <div key={spot && (spot.id)} className='spot-card'>
                <img src={spot && (spot.previewImage)} alt={spot && (spot.name)} onClick={() => {history.push(`/spots/${spot && (spot.id)}`)}}></img>
                <div key={spot && (spot.id)} className='spot-info'>
                    <p className='location-info'>{spot && (spot.city)}, {spot && (spot.state)}</p>
                    <p className='rating-info'><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span> {spot && (spot.avgRating)}</span></p>
                    <p className='price-info'><span>${spot && (spot.price)}</span> night</p>
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
