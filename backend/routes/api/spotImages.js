const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');
const router = express.Router();
const { isAuthorizedSpot } = require('../../utils/authorization');

router.delete( '/:imageId', requireAuth, async (req, res) => {
    const findSpotImage = await SpotImage.findByPk(req.params.imageId)
    const spotImageInfo = await SpotImage.findOne({
        where: {id: req.params.imageId},
        include: {
            model: Spot
        }
    })

    if (!spotImageInfo) {
        return res.status(404).json({message: 'Spot Image couldn\'t be found'})
    }

    const spotObj = spotImageInfo.toJSON();
    const { ownerId } = spotObj.Spot;

    if (req.user.id !== ownerId) {
        return res.status(403).json({message: 'Forbidden'})
    }
    else {
        await findSpotImage.destroy()
        return res.json({message: "Successfully deleted"})
    };
});

module.exports = router;
