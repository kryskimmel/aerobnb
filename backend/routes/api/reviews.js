const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { isAuthorizedReview } = require('../../utils/isAuthorizedReview');
const { reviewNotFound } = require('../../utils/reviewNotFound');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();


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

    if (findReviewById) {
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
router.put( '/:reviewId', reviewNotFound, requireAuth, isAuthorizedReview, async (req, res, next) => {
    const findReviewById = await Review.findByPk(req.params.reviewId);
    try{
        if (findReviewById){
            const { review, stars } = req.body;

            const updateReview = await findReviewById.update({
                review, stars
            });

            return res.json(updateReview);
        }
    }
    catch (err) {
        err.status = 400;
        delete err.title;
        delete err.stack;
        next(err);
    }


})


/****************************************************** */
//Delete a review
router.delete( '/:reviewId', reviewNotFound, requireAuth, isAuthorizedReview, async (req, res) => {
    const findReviewById = await Review.findByPk(req.params.reviewId);

    await findReviewById.destroy();
    return res.json({message: 'Successfully deleted'})
});


module.exports = router;
