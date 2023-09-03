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


export const signup = (user) => async (dispatch) => {
    const {username, firstName, lastName, email, password} = user;
    try {
        const response = await csrfFetch('/api/users', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        const data = await response.json();
        console.log(data, ':data after await response.json')
        dispatch(setUser(data.user));
        console.log(data.user, ':after dispatch')
        console.log(response, 'the response')
        return response;
    }
    catch (error) {
        throw new Error(`There was an issue in adding you as a user: ${error.message}`)
    }
};


export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };






const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            return {...state, user: null};
        default:
            return state;
    }

};


export default sessionReducer;
