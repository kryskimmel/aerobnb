import React from "react";
// import { LoginContext } from "../../context/LoginModalContext";
import "./LoginModal.css";
import LoginFormPage from "../LoginFormPage/index.js"

const LoginModal = () => {

    // const {openLogin} = useContext(LoginContext);


    return (
        <div className="login-modal-container">
            <div className="login-modal">
                <LoginFormPage/>
            </div>
        </div>
    )


}

export default LoginModal;
