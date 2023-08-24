import { csrfFetch } from "./csrf";


const LOAD_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = "spots/CREATE_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


//Actions:
const loadSpots = (data) => {
    return {
        type: LOAD_SPOTS,
        payload: data
    }
};


//Thunk Action Creators:
export const fetchAllSpots = () => async (dispatch) => {
        const response = await csrfFetch('/api/spots', {
            method: 'GET'
        });
        if (response.ok) {
            const allSpots = await response.json();
            dispatch(loadSpots(allSpots));
        }
        else throw Error("Could not fetch all spots");
};



//Reducer:
const initialState = {spots: null};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {};
            action.payload.Spots.forEach((spot) => { newState[spot.id] = spot });
            return newState;
        default:
            return state;
    }

};

export default spotReducer;
