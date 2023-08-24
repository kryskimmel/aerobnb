import React, {useContext} from "react";

import { OpenModalMenuContext } from "../../context/OpenModalContext";
import "./LoginFormModal.css";
import LoginFormPage from "../LoginFormPage";







const LoginFormModal = () => {
    const {onModalComponent} = useContext(OpenModalMenuContext)
    const loginModalClassName = onModalComponent ? "show-modal" : "hide-modal"
    const toggleOverlay = onModalComponent ? "add-overlay" : null

    return (
        <div className={toggleOverlay}>
            <div className={loginModalClassName}>
              <LoginFormPage/>
            </div>
        </div>
    )


}

export default LoginFormModal;
