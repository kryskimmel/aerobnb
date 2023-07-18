const { Spot, Review } = require('../db/models');

const notFound = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId)
    const findReviewById = await Review.findByPk(req.params.reviewId)
    if (findSpotbyId || findReviewById ){
        return next();
    }
    else {
        const err = {message: 'Spot couldn\'t be found'}
        res.status(404).json(err)
    }
};

module.exports = {notFound}
