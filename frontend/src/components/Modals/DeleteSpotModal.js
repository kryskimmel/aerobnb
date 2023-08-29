import React from "react";
import { useHistory } from "react-router-dom";
import useModal from "../../context/OpenModalContext";


const DeleteSpotModal = () => {
    const history = useHistory();
    const {closeModal} = useModal();

    const close = history.push('/spots/current');

    return (
        <div>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot from the listings?</h4>
            <button>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>

    )
};

export default DeleteSpotModal;
