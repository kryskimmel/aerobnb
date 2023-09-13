import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import OpenModalButton from "../Modals/OpenModalButton";
import useModal from "../../context/OpenModalContext";
import DeleteSpotModal from "../Modals/DeleteSpotModal";
import "./css/SpotManagement.css";



function SpotManagement() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const history = useHistory();
    const {setOnModalContent} = useModal();

    const createButtonCN = !spots.length ? "show-create" : "hide-create";

    useEffect(() => {
        dispatch(spotActions.fetchCurrUserSpots());
    }, [dispatch]);

    const loadSpots = spots && spots.map((spot) => {
        return (
            <div key={spot && spot.id} className="mng-spot-card" onClick={()=>{history.push(`/spots/${spot.id}`)}}>
                <img src={spot && spot.previewImage} alt={spot && spot.name} title={spot && spot.name}></img>
                <div className="mng-spot-info">
                    <p>{spot && spot.city}, {spot && spot.state}</p>
                    <p><span>${spot && spot.price}</span> night</p>
                    <p className="mng-rating-info"><span>{spot && spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</span></p>
                </div>
                <div>
                    <OpenModalButton
                        buttonText="Update"
                        onButtonClick
                        modalComponent
                    />
                    <OpenModalButton
                        buttonText="Delete"
                        onButtonClick={() => {setOnModalContent(<DeleteSpotModal spotId={spot.id}/>)}}
                        modalComponent={<DeleteSpotModal />}
                    />
                </div>
            </div>
        );
    });

    return (
        <div className="mng-spots-container">
            <h1>Manage Your Spots</h1>
            <button className={createButtonCN} onClick={() => {history.push("/spots/new")}}>Create a New Spot</button>
            {loadSpots}
        </div>
    )
}


export default SpotManagement;
