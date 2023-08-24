import React, {useState} from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

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

    const buttonClassName = "enabled-button" + (credential && password ? "" : " disabled-button");


    return (
        <div className="form-container-div">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="form-div">
        <div className="errors-div">
            {errors.credential && <p>The provided credentials were invalid.</p>}
        </div>
        <div className="credential-div">
            <input
                type="text"
                name="username"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
        </div>
        <div className="credential-div">
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className={"login-button-div"}>
            <button type="submit" className={buttonClassName}>Log In</button>
        </div>
        <div>
            <ul className="demo-user">
                <li
                    onClick={() => {
                    setCredential("Demo-lition");
                    setPassword("password");
                }}>
                    Demo User
                </li>
            </ul>
        </div>
        </form>
        </div>
    )
}

export default LoginFormPage;
