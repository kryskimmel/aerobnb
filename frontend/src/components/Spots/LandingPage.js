import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as spotActions from "../../store/spots";
import OpenModalButton from '../Modals/OpenModalButton';
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






    const mgmtDivClassName = window.location.href.includes('current') ? "show-mgmt" : "hidden-mgmt";

    const {setOnModalContent, setOnModalClose} = useModal();

    const handleModalOpen = () => {
        setOnModalContent(<DeleteSpotModal spotId={spotId} setSpotId={setSpotId}/>)
    };


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
            <div key={spot.id} className='spot-card'>
                <img src={previewImage} alt={name} onClick={() => {history.push(`/spots/${id}`)}}></img>
                <div key={spot.id} className='spot-info'>
                    <p className='location-info'>{city}, {state}</p>
                    <p className='rating-info'><i className="fa-solid fa-star" style={{color: "#000000"}}></i><span> {avgRating}</span></p>
                    <p className='price-info'><span>${price}</span> night</p>
                </div>
                <div className={mgmtDivClassName} id={`mgmt-${spot.id}`} onClick={(prev) => prev = setSpotId(spot.id)}>

                    <OpenModalButton
                        buttonText="Update"
                        onButtonClick
                        modalComponent
                    />
                    <OpenModalButton
                        buttonText="Delete"
                        onButtonClick={handleModalOpen}
                        modalComponent={<DeleteSpotModal/>}
                    />
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
