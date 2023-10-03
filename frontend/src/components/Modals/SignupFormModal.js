import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useModal from "../../context/OpenModalContext";
import * as sessionActions from "../../store/session";
import "./css/SignupFormModal.css";


const SignupFormModal = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const signupModalRef = useRef(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpErrors, setSignUpErrors] = useState({});
    const [disable, setDisable] = useState(true);
    const [canSubmit, setCanSubmit] = useState(true);
    const {closeModal} = useModal();




    // useEffect(() => {
    //     username.length < 4 || password.length < 6 ? setDisable(true) : setDisable(false);
    //  }, [username, password, disable])

     useEffect(() => {
        const errors = {};

        if (!email) errors.email = "Email is required."
        if (email.trim().length === 0) errors.email = "Email is required."
        if (!email.includes("@" && '.')) errors.email = "The provided email is invalid."

        if (!username) errors.username = "Username is required."
        if (username.trim().length === 0) errors.username = "Username is required."
        if (username && username.length < 4) errors.username = "Username must be 4 characters or more."

        if (!password) errors.password = "Password is required."
        if (password.trim().length === 0) errors.password = "Password is required."
        if (password && password.length < 6) errors.password = "Password must be 6 characters of more."

        if (password !== confirmPassword) errors.confirmPassword = "Confirm Password field must be the same as the Password field."

        if (!firstName) errors.firstName = "First Name is required."
        if (firstName.trim().length === 0) errors.firstName = "First Name is required."
        if (!/^[a-zA-Z\s]+$/.test(firstName)) errors.firstName = "First Name is not valid."

        if (!lastName) errors.lastName = "Last Name is required."
        if (lastName.trim().length === 0) errors.lastName = "Last Name is required."
        if (!/^[a-zA-Z\s]+$/.test(lastName)) errors.lastName = "Last Name is not valid."

        setSignUpErrors(errors);
     }, [
        email,
        username,
        password,
        confirmPassword,
        firstName,
        lastName
     ]);


    useEffect(() => {
        if (firstName && lastName && email && username && password && confirmPassword) setDisable(false)
        if (canSubmit && !Object.values(signUpErrors).length) setDisable(false);
        if (!canSubmit && Object.values(signUpErrors).length) setDisable(true);
        if (!canSubmit && !Object.values(signUpErrors).length) setDisable(false);
    }, [signUpErrors, canSubmit])



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(signUpErrors).length) {
            setCanSubmit(false);
            setDisable(true);
        }
        else {
            dispatch(sessionActions.signup({
                firstName,
                lastName,
                email,
                username,
                password
            }))
            closeModal();
        };
    };

    if (sessionUser) { <Redirect to="/" /> };


    const buttonClassName = "enabled-button" + (firstName && lastName && email && username && password && confirmPassword ? "" : " disabled-button");


    const handleOutsideClick = (e) => {
        if (signupModalRef.current === e.target) {
            closeModal()
        }
    }

    return (
        <div className="overlay" ref={signupModalRef} onClick={handleOutsideClick}>
            <div className="signup-modal" >
                <div className="form-container-div">
                    <h1>Sign Up</h1>
                    <div className="errors-div">
                            <p>{!canSubmit && signUpErrors.firstName && `${signUpErrors.firstName}`}</p>
                            <p>{!canSubmit && signUpErrors.lastName && `${signUpErrors.lastName}`}</p>
                            <p>{!canSubmit && signUpErrors.email && `${signUpErrors.email}`}</p>
                            <p>{!canSubmit && signUpErrors.username && `${signUpErrors.username}`}</p>
                            <p>{!canSubmit && signUpErrors.password && `${signUpErrors.password}`}</p>
                            <p>{!canSubmit && signUpErrors.confirmPassword && `${signUpErrors.confirmPassword}`}</p>
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
