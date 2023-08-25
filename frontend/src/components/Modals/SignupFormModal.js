import React, {useContext} from "react";
import { useSelector } from "react-redux";
import { OpenModalMenuContext } from "../../context/OpenModalContext";
import "./SignupFormModal.css";
import SignupFormPage from "../SignupFormPage";

const SignupFormModal = () => {

    const currUser = useSelector(state => state.session.user);
    console.log('THE CURRENT USER:', currUser)


    const modalContainerClassName = currUser ? "hidden" : "show";
    const toggleOverlay = currUser ? null : "overlay";


    return (
        <div className={modalContainerClassName} id={toggleOverlay}>
            <div className={modalContainerClassName} id="signup-modal">
              <SignupFormPage/>
            </div>
        </div>
    )


}

export default SignupFormModal;
