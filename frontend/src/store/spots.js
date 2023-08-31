import { csrfFetch } from "./csrf";


const LOAD = "spots/LOAD";
const CREATE = "spots/CREATE";
const DELETE = "spots/DELETE";


//Actions:
const loadSpots = (spots) => {
    return {
        type: LOAD,
        payload: spots
    }
};

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
        throw new error(`The following error has occurred while fetching all spots: ${error.message}`)
    }
};

//GET SPOT BY SPOT ID
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
};

//GET CURR USER SPOTS
export const fetchCurrUserSpots = () => async (dispatch) => {
    try {
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
export const addSpot = (spot, previewImage, additionalImages) => async (dispatch) => {
    let { address, city, state, country, lat, lng, name, description, price } = spot;
    try {
        const spotResponse = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
        });

        if (!spotResponse.ok) {
            throw new Error('Failed to create new spot');
        }

        const newSpot = await spotResponse.json();

        console.log(newSpot, 'THE NEW SPOT')

        const {url, preview} = previewImage;

        const previewImgResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                preview
            })
        });

        console.log('URL:', url, 'PREVIEW', preview)

        if (!previewImgResponse.ok) {
            throw new Error('Failed to add preview image to spot');
        }
        const addPreviewImg =  await previewImgResponse.json();

        const updatedSpot = {...newSpot, previewImage: addPreviewImg}

        dispatch(createSpot(updatedSpot))
        console.log('ADDITIONAL IMAGESSSS', additionalImages)



        if (additionalImages) {

            console.log(additionalImages);
            for (const key in additionalImages) {
                if (additionalImages.hasOwnProperty(key)) {
                    const {url, preview} = additionalImages[key]
                    console.log('URLLL', url, 'AND THE PREVIEW', preview)
                }


                const additionalImgResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url,
                        preview
                    })
                });

                if (!additionalImgResponse.ok) {
                    throw new Error('Failed to add additional images to spot');
                }

                const addAdditionalImgs = await additionalImgResponse.json();
                const updatedSpotV2 = {...newSpot, SpotImages: addAdditionalImgs }
                console.log(updatedSpotV2, 'V2')

                dispatch(createSpot(updatedSpotV2))
                return additionalImgResponse;
            }



            }



    } catch (error) {
        console.error('Error creating new spot:', error);
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
            dispatch(fetchCurrUserSpots());
            return response;
        }
        else throw new Error(`Failed to delete the spot with an id of ${spotId}`)
    }
    catch (error) {
        throw new Error('There was an issue in deleting your spot')
    }
};




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
        case CREATE:
            newState = action.payload
            return newState;
        case DELETE:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
