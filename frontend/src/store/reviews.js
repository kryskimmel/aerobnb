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
export const addAReview = (review, stars, spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                review,
                stars
            })
        });
        console.log('a response', response)

        if (response.ok) {
            const newResponse = await response.json();
            console.log('newwwewewe', newResponse)
            await dispatch(createReview(newResponse));
            return response;
        };
    }
    catch (error) {
        throw new Error(`An error occured while creating a review for the selected spot: ${error}`)
    }
}

//DELETE REVIEW
export const deleteSingleReview = (reviewId) => async (dispatch) => {
    console.log('thunk reviewid', reviewId)
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        console.log('RESPONSE', response)
        if (response.ok) {
            console.log('RESPONSE', response)
            dispatch(deleteReview(reviewId));
            return response;
        }
        else throw new Error(`Failed to delete the review with an id of ${reviewId}`)

    }
    catch (error) {
        throw new Error(`The following error has occurred while deleting your review for the selected spot: ${error}`)
    }
};


//Reducer:
const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = {};

    switch (action.type) {
        case LOAD:
            if (action.payload.Reviews) {
                action.payload.Reviews.map((review) => newState[review.id] = review);
                console.log('the load state', newState)
                return newState;
            }
            return newState;
        case CREATE:
            newState = JSON.parse(JSON.stringify(state));
            // The line above is making a deep copy
            newState[action.payload.id] = action.payload;
            console.log('the new create state', newState)
            return newState;
        case DELETE:
            newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
