import React from "react";
import { useHistory } from "react-router-dom";
import useModal from "../../context/OpenModalContext";
import './DeleteSpotModal.css'


const DeleteSpotModal = () => {
    const history = useHistory();
    const {closeModal} = useModal();

    const close = history.push('/spots/current');

    return (
        <div className="overlay">
            <div className="delete-modal">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to remove this spot from the listings?</h4>
                <button>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>


    )
};

export default DeleteSpotModal;
