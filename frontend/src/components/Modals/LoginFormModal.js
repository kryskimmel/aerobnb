import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import useModal from "../../context/OpenModalContext";
import LoginFormPage from "../LoginFormPage";
import "./css/LoginFormModal.css";


const LoginFormModal = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const loginModalRef = useRef(null);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(true);
    const {closeModal} = useModal();

    useEffect(() => {
        credential.length < 4 || password.length < 6 ? setDisable(true) : setDisable(false);
     }, [credential, password, disable])

     const handleDemoUser = () => {
        dispatch(sessionActions.login({ credential:"Demo-lition", password:"password"}));
        history.push('/');
        closeModal();
    };


    const buttonClassName = "enabled-button" + (credential.length >= 4 && password.length >= 6 ? "" : " disabled-button");


    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});

      dispatch(sessionActions.login({ credential, password })).then(() => {}).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    };

    if (sessionUser) {
        history.push('/')
        closeModal()
    };

    const handleOutsideClick = (e) => {
        if (loginModalRef.current === e.target) {
            closeModal()
        }
    }



    return (
        <div className="overlay" ref={loginModalRef} onClick={handleOutsideClick}>
            <div className="login-modal">
                <div className="form-container-div">
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit} className="form-div">
                        <div className="errors-div">
                            {errors.credential  &&  <p>The provided credentials were invalid.</p>}
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
                            <label className="demo-user" onClick={handleDemoUser}>Log in as Demo User</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default LoginFormModal;
