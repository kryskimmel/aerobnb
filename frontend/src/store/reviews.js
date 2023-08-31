import { csrfFetch } from "./csrf";


const LOAD = "reviews/LOAD";
const CREATE = "reviews/CREATE";
const DELETE = "reviews/DELETE";


//Actions:
const loadReviews = (reviews) => {
    return {
        type: LOAD,
        payload: reviews
    }
};


const createReview = (review) => {
    return {
        type: CREATE,
        payload: review
    }
};


const deleteReview = (review) => {
    return {
        type: DELETE,
        payload: review
    }
};



//Thunk Action Creators:

//LOAD REVIEWS
export const fetchSpotReviews = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'GET'
        })

        if (response.ok) {
            const reviews = await response.json();
            dispatch(loadReviews(reviews));
            return response;
        }
        else throw new Error(`Failed to fetch all reviews for the spot with an id of ${spotId}`);

    }
    catch (error) {
        throw new Error(`The following error has occurred while fetching the reviews for the selected spot: ${error.message}`)
    }
};

//CREATE REVIEW
// export const addAReview = (spotId) => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body:
//         })

//     }
//     catch (error) {
//         throw new Error(`The following error has occurred while creating a review for the selected spot: ${error.message}`)
//     }
// }


//Reducer:
const initialState = {reviews: null};

const reviewReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case LOAD:
            if (action.payload.Reviews) {
                action.payload.Reviews.forEach((review) => newState[review.id] = review);
                return newState;
            }
        default:
            return state;
    }
}

export default reviewReducer;
