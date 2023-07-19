const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const router = express.Router();


/****************************************************** */
//Delete an existing image for a review
router.delete ('/:imageId', requireAuth, async (req, res) => {
    const findReviewImage = await ReviewImage.findByPk(req.params.imageId)
    const reviewImageInfo = await ReviewImage.findOne({
        where: {id: req.params.imageId},
        include: {
            model: Review
        }
    })

     if (!reviewImageInfo) {
        return res.status(404).json({message: 'Review Image couldn\'t be found'})
    }

    const reviewObj = reviewImageInfo.toJSON();
    const {userId} = reviewObj.Review;
    console.log(userId)

    if (req.user.id !== userId) {
        return res.status(403).json({message: 'Forbidden'})
    }

    else {
        await findReviewImage.destroy()
        return res.json({message: "Successfully deleted"})
    };
});

module.exports = router;
