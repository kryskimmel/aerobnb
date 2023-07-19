const { Review } = require('../db/models');

const reviewNotFound = async function (req, res, next) {
    const findReviewById = await Review.findByPk(req.params.reviewId)
    if (findReviewById){
        return next();
    }
    else {
        const err = {message: 'Review couldn\'t be found'}
        res.status(404).json(err)
    }
};

module.exports = {reviewNotFound}
