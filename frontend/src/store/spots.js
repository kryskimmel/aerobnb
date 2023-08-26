import { csrfFetch } from "./csrf";


const LOAD_SPOTS = "spots/GET_SPOTS";
const CURR_SPOT = "spots/CURR_SPOTS";

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

const loadCurrSpot = (currSpot) => {
    return {
        type: CURR_SPOT,
        payload: currSpot
    }
}


//Thunk Action Creators:
export const fetchAllSpots = () => async (dispatch) => {

    try {
        const response = await fetch('/api/spots', {
            method: 'GET'
        });
        if (response.ok) {
            const allSpots = await response.json();
            dispatch(loadSpots(allSpots));
        }
        else throw new Error("Failed to fetch all spots");
    }
    catch (error) {
        throw new error(`The following error has occurred while fetching all spots: ${error.message}`)
    }

};

export const fetchSpotById = (spotId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${spotId}`, {
            method: 'GET'
        });
        if (response.ok) {
            const spot = await response.json();
            dispatch(loadCurrSpot(spot));
        }
        else throw new Error(`Failed to fetch spot with an id of ${spotId}`);
    }
    catch (error) {
        throw new Error(`The following error has occurred while fetching the spot: ${error.message}`)
    }

}



//Reducer:
const initialState = {spots: null};

const spotReducer = (state = initialState, action) => {
    const newState = {};

    switch (action.type) {
        case LOAD_SPOTS:
            action.payload.Spots.forEach((spot) => { newState[spot.id] = spot });
            return newState;
        case CURR_SPOT:
            newState.currSpot = action.payload;
            return newState;
        default:
            return state;
    }

};

export default spotReducer;
