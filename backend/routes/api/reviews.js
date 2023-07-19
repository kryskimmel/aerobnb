const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { isAuthorizedReview } = require('../../utils/isAuthorizedReview');
const { reviewNotFound } = require('../../utils/reviewNotFound');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .isString().withMessage('Please provide a review that uses letters or alphanumeric characters')
      .isLength({min: 2}).withMessage('Review must have a minimum of 2 characters')
      .isLength({max: 500}).withMessage('Review must be less than 500 characters')
      .notEmpty().withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isDecimal()
        .not().isString().withMessage('Star rating is not valid')
        .isIn([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).withMessage('Stars must be an integer from 1 to 5')
        .notEmpty().withMessage('Star rating is not valid'),
    handleValidationErrors
  ];



/****************************************************** */
//Get all reviews of the current user
router.get( '/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const getReviewsByCurrUser = await Review.findAll({
        where: {userId},
        include:[
        {model: User},
        {model: Spot,
        attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
        include: {model: SpotImage, as: 'previewImage'}},
        {model: ReviewImage}]
    });

    const reviewsList = [];
    getReviewsByCurrUser.forEach(spot => {
        reviewsList.push(spot.toJSON())
    });
    // console.log(reviewsList)

    reviewsList.forEach(attribute => {
        const {previewImage} = attribute.Spot;
        previewImage.forEach(key => {
            if (key.preview === true){attribute.Spot.previewImage = key.url}
       })

    });
    return res.json({"Reviews": reviewsList})
});


/****************************************************** */
//Add an image to a review based on the review's id
router.post( '/:reviewId/images', reviewNotFound, requireAuth, isAuthorizedReview, async (req, res, next) => {
    const { url } = req.body;
    const findReviewById = await Review.findByPk(req.params.reviewId);
    const getReviewImages = await ReviewImage.findAll({where: {reviewId: req.params.reviewId}})

    if (getReviewImages.length > 10) return res.status(403).json({message: 'Maximum number of images for this resource was reached'});
    else {
            const createImage = await ReviewImage.create({
            reviewId: parseInt(req.params.reviewId),
            url
        });

        return res.json({
            id: createImage.id,
            url
        });
    };
});


/****************************************************** */
//Edit a review
router.put( '/:reviewId', reviewNotFound, requireAuth, isAuthorizedReview, validateReview, async (req, res, next) => {
    try{
        const findReviewById = await Review.findByPk(req.params.reviewId);
        if (findReviewById){
            const { review, stars } = req.body;

            const updatedReview = await findReviewById.update({
                review, stars
            });

            return res.json(updatedReview);
        }
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});


/****************************************************** */
//Delete a review
router.delete( '/:reviewId', reviewNotFound, requireAuth, isAuthorizedReview, async (req, res) => {
    const findReviewById = await Review.findByPk(req.params.reviewId);

    await findReviewById.destroy();
    return res.json({message: 'Successfully deleted'})
});


module.exports = router;
