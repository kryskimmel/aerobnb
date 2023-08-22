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

    const buttonClassName = "enabled-button" + (!errors ? "" : " disabled-button");


    return (
        <div className="form-container-div">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="form-div">
        <fieldset>
        <div className="label-div">
            <h3>Username or Email</h3>
            <input
                type="text"
                name="username"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />

        </div>
        <div className="label-div">
            <h3>Password</h3>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className="errors-div">
            {errors.credential && <p>{errors.credential}</p>}
        </div>
        <div className={"login-button-div"}>
            <button type="submit" className={buttonClassName}>Log In</button>
        </div>
        </fieldset>
        </form>
        </div>
    )
}

export default LoginFormPage;
