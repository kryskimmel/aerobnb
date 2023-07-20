const { Spot, Review, Booking } = require('../db/models');

const existSpot = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId)
    if (findSpotbyId){
        return next();
    }
    else {
        const err = {message: 'Spot couldn\'t be found'}
        res.status(404).json(err)
    }
};


const existReview = async function (req, res, next) {
    const findReviewById = await Review.findByPk(req.params.reviewId)
    if (findReviewById){
        return next();
    }
    else {
        const err = {message: 'Review couldn\'t be found'}
        res.status(404).json(err)
    }
};


const existBooking = async function (req, res, next) {
    const findBookingById = await Booking.findByPk(req.params.bookingId)
    if (findBookingById){
        return next();
    }
    else {
        const err = {message: 'Booking couldn\'t be found'}
        res.status(404).json(err)
    }
};



module.exports = {  existSpot,
                    existReview,
                    existBooking
                }
