import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import useModal from "../../context/OpenModalContext";
import './css/DeleteSpotModal.css'


const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const history = useHistory();


    console.log(spotId, ':spotid')

    const handleYes = async (e) => {
        e.preventDefault();
        dispatch(spotActions.deleteSingleSpot(spotId));
        closeModal();
        history.push('/spots/current')

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
