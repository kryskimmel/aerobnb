import React, { useState } from "react";
import "./LoginModal.css";

export default function Modal() {
  const [loginModal, setLoginModal] = useState(false);

  return (
        <>
        <li onClick={() => {setShowMenu(false), toggleModal}}><NavLink to="/login">Log In</NavLink></li>

    </>
    );
}
