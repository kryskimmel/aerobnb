const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { isAuthorized } = require('../../utils/authorization');
const { reviewNotFound } = require('../../utils/reviewNotFound');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();


/****************************************************** */
//Get all reviews of the current user
router.get( '/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const getReviewsByCurrUser = await Review.findAll({
        where: {userId}
    });
    return res.json(getReviewsByCurrUser)
});


/****************************************************** */
//Add an image to a review based on the review's id
router.post( '/:reviewId/images', reviewNotFound, requireAuth, isAuthorized, async (req, res) => {
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


/****************************************************** */
//Delete a review

module.exports = router;
