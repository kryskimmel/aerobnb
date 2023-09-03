import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./css/SignupFormModal.css";


const SignupFormModal = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disable, setDisable] = useState(true);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        username.length < 4 || password.length < 6 ? setDisable(true) : setDisable(false);
     }, [username, password, disable])

    if (sessionUser) return <Redirect to="/" />;



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({
                firstName,
                lastName,
                email,
                username,
                password
            }))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) {
            //         setErrors(data.errors);
            //     }
            // });
        }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

    const buttonClassName = "enabled-button" + (email && username.length >= 4 && firstName && lastName && password.length >= 6 && confirmPassword ? "" : " disabled-button");


    return (
        <div className="overlay">
            <div className="signup-modal">
                <div className="form-container-div">
                    <h1>Sign Up</h1>
                    <div className="errors-div">
                        {errors.firstName && <p>{errors.firstName}</p>}
                        {errors.lastName && <p>{errors.lastName}</p>}
                        {errors.email && <p>{errors.email}</p>}
                        {errors.username && <p>{errors.username}</p>}
                        {errors.password && <p>{errors.password}</p>}
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>
                    <form onSubmit={handleSubmit} className="form-div">
                        <div className="field-group" id="field-group-1">
                            <label className="label">First Name</label>
                                <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                />
                            <label className="label">Last Name</label>
                                <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                />
                        </div>
                        <div className="field-group" id="field-group-2">
                            <label className="label">Email</label>
                                <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            <label className="label">Username</label>
                                <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                />
                        </div>
                        <div className="field-group" id="field-group-3">
                            <label className="label">Password</label>
                                <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            <label className="label">Confirm Password</label>
                                <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                />
                        </div>
                        <button type="submit" disabled={disable} className={buttonClassName}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignupFormModal;
