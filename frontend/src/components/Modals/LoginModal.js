import React from "react";
import "./LoginModal.css";
import LoginFormPage from "../LoginFormPage";

const LogInModal = ({open}) => {

    let page = document.querySelector('body');

    if (!open) return null;
    else {
        page.setAttribute("class", "apply-overlay")
        return (
                <div className="modal-div">
                    <div className="login-modal-container">
                        <LoginFormPage/>
                    </div>
                </div>
        )
    }


}


export default LogInModal;
