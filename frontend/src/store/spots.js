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

// const loadCurrSpot = (currSpot) => {
//     return {
//         type: CURR_SPOT,
//         payload: currSpot
//     }
// }


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

// export const fetchSpotById = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'GET'
//     });
//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(loadCurrSpot(spot));
//     }
//     else throw Error("Could not fetch the selected spot");
// }



//Reducer:
const initialState = {spots: null};

const spotReducer = (state = initialState, action) => {
    const newState = {};

    switch (action.type) {
        case LOAD_SPOTS:
            action.payload.Spots.forEach((spot) => { newState[spot.id] = spot });
            return newState;
        case CURR_SPOT:
            newState['currSpot'] = action.payload;
        default:
            return state;
    }

};

export default spotReducer;
