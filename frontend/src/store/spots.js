import { csrfFetch } from "./csrf";


const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


//Actions:
const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
};


//Thunk Action Creators:
export const fetchAllSpots = (spots) => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(getSpots(data.spots));
    return response;
};



//Reducer:
const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        default:
            return state;
    }

};

export default spotReducer;
