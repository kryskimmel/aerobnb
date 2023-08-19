// This file contains all actions specific to the session user's info and the session user's Redux reducer
import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// Actions:
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};


const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

// Thunk Action creators:
export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};


export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

// export const restoreSessionUser = (user) => async (dispatch) => {
//     const {createdAt, email, id, updatedAt, username, firstName, lastName} = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'GET',
//         body: JSON.stringify({
//             createdAt,
//             email,
//             id,
//             updatedAt,
//             username,
//             firstName,
//             lastName
//         })
//     });

//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response
// };


export const signup = (user) => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user;
    const response = csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    })
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;

}






const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    }

};


export default sessionReducer;
