import React, {useState} from "react";
import "./LoginModal.css";
import LoginFormPage from "../LoginFormPage";

const LogInModal = ({open}) => {

    let body = document.querySelector("body");

    if (open) body.setAttribute("class", "apply-overlay")

    if (!open) return null;
    else {
        return (
            <div className="overlay">
                <div className="login-modal-container">
                    <LoginFormPage/>
                </div>
            </div>
        )
    }


}


export default LogInModal;
