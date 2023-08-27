import { csrfFetch } from "./csrf";


const LOAD = "spots/LOAD";

const CURR_ID = "spots/CURR_ID";

const CREATE_SPOT = "spots/CREATE_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


//Actions:
const loadSpots = (spots) => {
    return {
        type: LOAD,
        payload: spots
    }
};

// export const setCurrId = (spotId) => {
//     return {
//         type: CURR_ID,
//         payload: spotId
//     }
// }

// export const loadCurrSpot = (currSpot) => {
//     return {
//         type: CURR_SPOT,
//         payload: currSpot
//     }
// }


//Thunk Action Creators:
export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/spots', {
            method: 'GET'
        });
        if (response.ok) {
            const spots = await response.json();
            dispatch(loadSpots(spots));
            return response;
        }
        else throw new Error("Failed to fetch all spots");
    }
    catch (error) {
        throw new error(`The following error has occurred while fetching all spots: ${error.message}`)
    }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${spotId}`, {
            method: 'GET'
        });
        if (response.ok) {
            const spot = await response.json();
            console.log("Fetched spot data:", spot)
            dispatch(loadSpots(spot));
            return response;
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
    let newState = {};

    switch (action.type) {
        case LOAD:
            if (action.payload.Spots) {
                action.payload.Spots.forEach((spot) => newState[spot.id] = spot)
                return newState;
            }
            else {
                newState = action.payload;
                return newState;
            }
        default:
            return state;
    }
};

export default spotReducer;
