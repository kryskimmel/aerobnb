const { Review } = require('../db/models');

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

module.exports = {isAuthorizedReview}
