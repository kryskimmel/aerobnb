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
};


export const addSpot = (spot, url, preview) => async (dispatch) => {
    try {
        const { address, city, state, country, lat, lng, name, description, price } = spot;

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

        const uploadImage = async (preview) => {
            const imgResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url, preview })
            });

            if (!imgResponse.ok) {
                throw new Error(`Failed to upload ${preview ? 'preview' : 'additional'} image`);
            }

            return await imgResponse.json();
        };

        const previewImg = await uploadImage(true);
        const additionalImgs = await uploadImage(false);

        newSpot.SpotImages.push(previewImg, additionalImgs);

        dispatch(createSpot(newSpot));
    } catch (error) {
        console.error('Error creating new spot:', error);
        throw new Error('There was an issue in creating your new spot');
    }
};

// export const addSpot = (spot, url, preview) => async (dispatch) => {
//     try {
//         const {address, city, state, country, lat, lng, name, description, price} = spot
//         const spotResponse = await csrfFetch('/api/spots', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 address,
//                 city,
//                 state,
//                 country,
//                 lat,
//                 lng,
//                 name,
//                 description,
//                 price
//             })
//         });
//         if (spotResponse.ok) {
//             const newSpot = await spotResponse.json();
//             dispatch(createSpot(newSpot));
//         } else {
//             throw new Error('Failed to create new spot')
//         }
//             const previewImgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({url, preview: true})
//             });
//             if (previewImgResponse.ok) {
//                 const previewImg = await previewImgResponse.json();
//                 spot.SpotImages.push(previewImg);
//                 dispatch(createSpot(spot));
//             }
//             else {
//                 throw new Error('Failed to add preview image')
//             }
//                 const additionalImgsresponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({url, preview: false})
//                 });
//             if (additionalImgsresponse.ok) {
//                 const additionalImgs = await additionalImgsresponse.json();
//                 spot.SpotImages.push(additionalImgs);
//                 dispatch(createSpot(spot));
//             }
//         else{
//             throw new Error('Failed to add additional images')
//         }
//     }
//     catch (error) {
//         throw new Error('There was an issue in creating your new spot')
//     }
// };



// export const addSpot = (spot) => async (dispatch) => {
//     try {
//         const {address, city, state, country, lat, lng, name, description, price} = spot
//         const response = await csrfFetch('/api/spots', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 address,
//                 city,
//                 state,
//                 country,
//                 lat,
//                 lng,
//                 name,
//                 description,
//                 price
//             })
//         });
//         if (response.ok) {
//             const newSpot = await response.json();
//             dispatch(createSpot(newSpot));
//             return response;
//         }
//         else throw new Error('Failed to create new spot')
//     }
//     catch (error) {
//         throw new Error('There was an issue in creating your new spot')
//     }
// };


export const addPreviewImage = (spot, url, preview = true) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url, preview})
        });
        if (response.ok) {
            const previewImg = await response.json();
            spot.SpotImages.push(previewImg);
            dispatch(createSpot(spot));
            return response;
        }
        else {
            throw new Error(`Failed to add preview image to the spot with an id of ${spot.id}`)
        }
    }
    catch (error) {
        throw new Error('There was an issue in adding your preview image')
    }
};


export const addImages = (spot, url, preview = false) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url, preview})
        });
        if (response.ok) {
            const additionalImgs = await response.json();
            spot.SpotImages.push(additionalImgs);
            dispatch(createSpot(spot));
            return response;
        }
        else {
            throw new Error(`Failed to add image to the spot with an id of ${spot.id}`)
        }
    }
    catch (error) {
        throw new Error('There was an issue in adding your image')
    }
};

export const deleteSingleSpot = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            dispatch(deleteSpot(spotId));
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
            newState = action.payload;
            return newState;
        case DELETE:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
