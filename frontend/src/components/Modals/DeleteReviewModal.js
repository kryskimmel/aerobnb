import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviews";
import useModal from "../../context/OpenModalContext";
import './css/DeleteReviewModal.css';


const DeleteReviewModal = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleYes = async (e) => {
        e.preventDefault();
        dispatch(reviewActions.deleteSingleReview(reviewId, spotId));
        closeModal();
    };

    return (
        <div className="overlay">
            <div className="delete-modal">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete this review?</h4>
                <button className="yes-button" onClick={handleYes}>Yes (Delete Review)</button>
                <button className="no-button" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>


    )
};

export default DeleteReviewModal;
