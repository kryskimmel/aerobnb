import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { nanoid } from 'nanoid';
import * as spotActions from "../../store/spots";
import useModal from '../../context/OpenModalContext';
import OpenModalButton from '../Modals/OpenModalButton';
import DeleteSpotModal from '../Modals/DeleteSpotModal';
import './css/SpotManagement.css';


// const SpotManagement = () => {
//     return (
//         <>
//         <div className='header-div'>
//             <h1>Manage Your Spots</h1>
//             <button className='create-spot-button'>Create a New Spot</button>
//         </div>
//         <LandingPage/>
//         </>
//     )
// };


const SpotManagement = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => Object.values(state.spots));
    const [spotId, setSpotId] = useState();

    useEffect(() => {
        dispatch(spotActions.fetchSpots());
        console.log('the current spot id', spotId)
    }, [dispatch, spotId]);

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
                <div className="show-mgmt" id={`mgmt-${spot.id}`} onClick={(prev) => prev = setSpotId(spot.id)}>

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


export default SpotManagement;
