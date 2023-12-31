import React, {useEffect, useState} from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useModal from "../../context/OpenModalContext";
import "./LoginForm.css";


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(true);
    const {closeModal} = useModal();


    useEffect(() => {
       credential.length < 4 && password.length < 6 ? setDisable(true) : setDisable(false)
    }, [credential, password, disable])


    const handleDemoUser = () => {
        dispatch(sessionActions.login({ credential:"Demo-lition", password:"password"}));
        closeModal();
    };

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});

      return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    };

    const buttonClassName = "enabled-button" + (credential.length >= 4 && password.length >= 6 ? "" : " disabled-button");


    return (
        <div className="form-container-div">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="form-div">
        <div className="errors-div">
            {errors.credential && <p>The provided credentials were invalid.</p>}
        </div>
        <div className="field-div" id="field-div-1">
            <label>Username or email</label>
            <input
                type="text"
                name="username"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
        </div>
        <div className="field-div">
        <label>Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className={"login-button-div"}>
            <button type="submit" disabled={disable} className={buttonClassName}>Log In</button>
        </div>
        <div>
            <li className="demo-user" onClick={handleDemoUser}>Log in as Demo User</li>
        </div>
        </form>
        </div>
    )
}

export default LoginFormPage;
