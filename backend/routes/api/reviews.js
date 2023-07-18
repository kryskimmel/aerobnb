const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { isAuthorized } = require('../../utils/authorization');
const { notFound } = require('../../utils/notFound');
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
router.post( '/:reviewId/images', async (req, res) => {
    const { url } = req.body;
    const findReviewById = await Review.findByPk(req.params.reviewId)
})


/****************************************************** */
//Edit a review


/****************************************************** */
//Delete a review

module.exports = router;
