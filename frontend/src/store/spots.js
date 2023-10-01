import { csrfFetch } from "./csrf";


const LOAD = "spots/LOAD";
const LOADSINGLESPOT = "spot/LOADSINGLESPOT"
const CREATE = "spots/CREATE";
const DELETE = "spots/DELETE";
const UPDATE = "spots/UPDATE";


//Actions:
const loadSpots = (spots) => {
    return {
        type: LOAD,
        payload: spots
    }
};

const loadSpotById = (spot) => {
    return {
        type: LOADSINGLESPOT,
        payload: spot
    }
}


const createSpot = (spot) => {
    return {
        type: CREATE,
        payload: spot
    }
};


const deleteSpot = (spotId) => {
    return {
        type: DELETE,
        payload: spotId
    }
};


const updateSpot = (spot) => {
    return {
        type: UPDATE,
        payload: spot
    }
};


//Thunk Action Creators:

//GET ALL SPOTS
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
        throw new Error(`The following error has occurred while fetching all spots: ${error.message}`)
    }
};

//GET SPOT BY SPOT ID
export const fetchSingleSpot = (spotId) => async (dispatch) => {
    try {
        console.log(`/api/spots/${spotId}`, 'route')
        const response = await fetch(`/api/spots/${spotId}`, {
            method: 'GET'
        });
        if (response.ok) {
            const spot = await response.json();
            dispatch(loadSpotById(spot));
            return response;
        }
        else throw new Error(`Failed to fetch spot with an id of ${spotId}`);
    }
    catch (error) {
        throw new Error(`The following error has occurred while fetching the spot: ${error.message}`)
    }
};

//GET CURR USER SPOTS
export const fetchCurrUserSpots = () => async (dispatch) => {
    try {
        console.log(`/api/spots/current`, 'current')
        const response = await fetch(`/api/spots/current`, {
            method: 'GET'
        });
        if (response.ok) {
            const userSpots = await response.json();
            dispatch(loadSpots(userSpots));
            return response
        }
        else throw new Error(`Failed to load user's spots`)
    }
    catch (error) {
        throw new Error(`The following error has occured while fetching the user's spots: ${error.message}`)
    }
}

//CREATE A SPOT
export const addSpot = (spot, previewImg) => async (dispatch) => {
    try {
        const spotResponse = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(spot)
        });
        if (spotResponse.ok) {
            const buildSpot = await spotResponse.json();
            const previewImgResponse = await csrfFetch(`/api/spots/${buildSpot.id}/images`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(previewImg)
            });
        if (previewImgResponse.ok) {
            const addPreviewImg =  await previewImgResponse.json();
            const createdSpot = {...buildSpot, SpotImages: [addPreviewImg]}
            dispatch(createSpot(createdSpot));
            await dispatch(fetchSpots());
        }}
    } catch (error) {
        console.error(`There was an issue in creating your spot: ${error.message}`);
    }
};






//DELETE A SPOT
export const deleteSingleSpot = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('THE SPOT TO DELETE HAS ID :', spotId)
            dispatch(deleteSpot(spotId));
            await dispatch(fetchCurrUserSpots());
            return response;
        }
    }
    catch (error) {
        throw new Error(`There was an issue in deleting your spot: ${error.message}`)
    }
};


//UPDATE SPOT
export const updateSingleSpot = (spotId, spot, previewImg) => async (dispatch) => {
    try {
        const updatedSpotResponse = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(spot)
        });
        if (updatedSpotResponse.ok) {
            const updatedSpotInfo = await updatedSpotResponse.json();
            dispatch(updateSpot(updatedSpotInfo));
            await dispatch(fetchCurrUserSpots());
        }
    }
    catch (error) {
        throw new Error('There was an issue in updating your spot')
    }
}




//Reducer:
const initialState = {};

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
        case LOADSINGLESPOT:
            newState = {...state, [action.payload.id] : action.payload}
            return newState;
        case CREATE:
            newState = {...state, [action.payload.id] : action.payload}
            return newState;
        case UPDATE:
            newState = {...state, [action.payload.id] : action.payload}
            return newState;
        case DELETE:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
