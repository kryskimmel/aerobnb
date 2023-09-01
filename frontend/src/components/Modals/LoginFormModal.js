import React, {useContext} from "react";
import { useSelector } from "react-redux";

import { OpenModalMenuContext } from "../../context/OpenModalContext";
import "./css/LoginFormModal.css";
import LoginFormPage from "../LoginFormPage";

const LoginFormModal = () => {

    const currUser = useSelector(state => state.session.user);
    const modalContainerClassName = currUser ? "hidden" : "show";
    const toggleOverlay = currUser ? null : "overlay";


    return (
        <div className={modalContainerClassName} id={toggleOverlay}>
            <div className={modalContainerClassName} id="login-modal">
              <LoginFormPage/>
            </div>
        </div>
    )


}

export default LoginFormModal;
