import { csrfFetch } from "./csrf";


const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


//Actions:
const getAllSpots = (data) => {
    return {
        type: GET_SPOTS,
        payload: data
    }
};


//Thunk Action Creators:
export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET'
    });
    const allSpots = await response.json();
    dispatch(getAllSpots(allSpots));
};



//Reducer:
const initialState = {spots: null};

const spotReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SPOTS:
            const newState = {};
            action.payload.Spots.forEach((spot) => { newState[spot.id] = spot});
            return newState;
        default:
            return state;
    }

};

export default spotReducer;
