const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { validateReview } = require('../../utils/validate')
const { requireAuth } = require('../../utils/auth');
const { isAuthorizedReview } = require('../../utils/authorization');
const { existReview } = require('../../utils/notFound');
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

       let {createdAt, updatedAt} = attribute;

       attribute.createdAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');
       attribute.updatedAt = updatedAt.toISOString().slice(0, 19).replace('T', ' ');

    });
    return res.json({"Reviews": reviewsList})
});


/****************************************************** */
//Add an image to a review based on the review's id
router.post( '/:reviewId/images', requireAuth, existReview, isAuthorizedReview, async (req, res, next) => {
    const { url } = req.body;

    const reviewImageCount = await ReviewImage.count({where: {reviewId: req.params.reviewId}})
    if (reviewImageCount >= 10) return res.status(403).json({message: 'Maximum number of images for this resource was reached'});
    else {
        const createImage = await ReviewImage.create({
            reviewId: parseInt(req.params.reviewId),
            url
        });
        console.log('IMAGE COUNT',reviewImageCount)
        return res.json({
            id: createImage.id,
            url
        });
    }
});


/****************************************************** */
//Edit a review
router.put( '/:reviewId', requireAuth, existReview, isAuthorizedReview, validateReview, async (req, res, next) => {
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
router.delete( '/:reviewId', requireAuth, existReview, isAuthorizedReview, async (req, res) => {
    const findReviewById = await Review.findByPk(req.params.reviewId);

    await findReviewById.destroy();
    return res.json({message: 'Successfully deleted'})
});


module.exports = router;
