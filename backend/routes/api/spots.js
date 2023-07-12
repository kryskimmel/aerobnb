const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const user = require('../../db/models/user');
const router = express.Router();


//Get all spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll({
        include: {
            model: SpotImage,
            as: 'previewImage'
        }
    });
    return res.json(getAllSpots)
});



//Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const getSpotsByCurrUser = await Spot.findAll({
        where: {ownerId}
    })
    return res.json(getSpotsByCurrUser)
});



//Get details for a spot from an id
router.get('/:spotId', async (req, res, next) => {

        const getSpotById = await Spot.findByPk(req.params.spotId);
        if (!getSpotById){
            const err = new Error(`Spot with an id of ${req.params.spotId} does not exist`);
            err.title = "404 Not Found"
            err.status = 404;
            throw err;
        }
        return res.json(getSpotById)
});



//Create a spot
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
    const { address, city, state,
            country, lat, lng,
            name, description, price } = req.body;

            const ownerId = req.user.id;
    try {
        const createSpot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
    return res.status(201).json(createSpot);
    } catch (err) {
        err.status = 400
        next(err);
    }
});



//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;

    const findSpotbyId = await Spot.findByPk(req.params.spotId);
    if (!findSpotbyId){
        const err = new Error(`Spot couldn't be found`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }
    const addImageToSpot = await SpotImage.create({
        spotId: req.params.spotId,
        url
    });

   const imageSuccessfullyAdded = {
        id: req.params.spotId,
        url: url,
        preview: true
   }

    return res.json(imageSuccessfullyAdded)
});




module.exports = router;
