import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spots";
import useModal from "../../context/OpenModalContext";
import './DeleteSpotModal.css'


const DeleteSpotModal = ({spotId, setSpotId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();


    // useEffect(() => {
    //     console.log(spotId, 'curr spotId now');
    //   }, [spotId]);



    const handleYes = () => {
        closeModal();
        return  dispatch(spotActions.deleteSingleSpot(spotId))
    };

    return (
        <div className="overlay">
            <div className="delete-modal">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to remove this spot from the listings?</h4>
                <button className="yes-button" onClick={handleYes}>Yes (Delete Spot)</button>
                <button className="no-button" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>


    )
};

export default DeleteSpotModal;
