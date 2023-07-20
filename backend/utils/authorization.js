const { Spot, Review, Booking } = require('../db/models');


const isAuthorizedSpot = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (req.user.id === findSpotbyId.ownerId){
        return next();
    }
    else {
        const err = {message: 'Forbidden'}
        res.status(403).json(err)
    }
};


const isAuthorizedReview = async function (req, res, next) {
    const findReviewbyId = await Review.findByPk(req.params.reviewId);

    if (req.user.id === findReviewbyId.userId){
        return next();
    }
    else {
        const err = {message: 'Forbidden'}
        res.status(403).json(err)
    }
};


const isAuthorizedBooking = async function (req, res, next) {
    const findBookingbyId = await Booking.findByPk(req.params.bookingId);

    if (req.user.id === findBookingbyId.userId){
        return next();
    }
    else {
        const err = {message: 'Forbidden'}
        res.status(403).json(err)
    }
};


module.exports = {  isAuthorizedSpot,
                    isAuthorizedReview,
                    isAuthorizedBooking
                }
