const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const router = express.Router();


/****************************************************** */
//Get all spots
router.get( '/', async (req, res) => {
    const getAllSpots = await Spot.findAll({
        include: [
        {
            model: Review,
            as: 'avgRating'
        },
        {
            model: SpotImage,
            as: 'previewImage',
        }]
    });

    const spotsList = [];

    getAllSpots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(attribute => {
        attribute.previewImage.forEach(key => {
        if (key.url) { attribute.previewImage = key.url }
        })
    });

    spotsList.forEach(attribute => {
        attribute.avgRating.forEach(key => {
        if(key.stars){ attribute.avgRating = key.stars }
       })
    });

    return res.json(spotsList)
});


/****************************************************** */
//Get all spots owned by the current user
router.get( '/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const getSpotsByCurrUser = await Spot.findAll({
        where: {ownerId}
    });

    return res.json(getSpotsByCurrUser)
});


/****************************************************** */
//Get details for a spot from an id
router.get( '/:spotId', async (req, res, next) => {
    const findSpotById = await Spot.findByPk(req.params.spotId);

    if (!findSpotById){
        const err = new Error(`Spot with an id of ${req.params.spotId} does not exist`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }

    return res.json(findSpotById)
});


/****************************************************** */
//Create a spot
router.post( '/', requireAuth, handleValidationErrors, async (req, res, next) => {
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


/****************************************************** */
//Add an Image to a Spot based on the Spot's id
router.post( '/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;

    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (!findSpotbyId || req.user.id !== findSpotbyId.ownerId){
        let err = new Error(`Spot couldn't be found`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }
    else if (findSpotbyId && (req.user.id === findSpotbyId.ownerId) ) {
        await SpotImage.create({
            spotId: req.params.spotId,
            url
        });

        const imageSuccessfullyAdded = {
            id: req.params.spotId,
            url,
            preview
        }

       return res.status.json(imageSuccessfullyAdded)
    }
});


/****************************************************** */
//Create a review for a spot based on the Spot's id
router.post( '/:spotId/reviews', requireAuth, handleValidationErrors, async (req, res) => {
    const { review, stars } = req.body;

    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (!findSpotbyId){
        const err = new Error(`Spot couldn't be found`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }
    else {
        try {
            const ownerId = req.user.id;
            const addReviewToSpot = await Review.create(
                {
                    userId: ownerId,
                    spotId: parseInt(req.params.spotId),
                    review,
                    stars
                })

        return res.status.json(addReviewToSpot)
        }
        catch (err) {
            err.status = 400;
            next(err)
        }
    }
});


/****************************************************** */
//Edit a spot
router.put( '/:spotId', requireAuth, async (req, res) => {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);
    if (!findSpotbyId || req.user.id !== findSpotbyId.ownerId){
        let err = new Error(`Spot couldn't be found`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }
    else {
        try {
            const { address, city, state,
                country, lat, lng,
                name, description, price } = req.body;

            const editedSpot = await Spot.update({
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

        return res.status.json(editedSpot);
        } catch (err) {
            err.status = 400
            next(err);
        }
    }
})




/****************************************************** */
//Delete a spot
router.delete( '/:spotId', requireAuth, async (req, res) => {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);
    if (!findSpotbyId || req.user.id !== findSpotbyId.ownerId){
        let err = new Error(`Spot couldn't be found`);
        err.title = "404 Not Found"
        err.status = 404;
        throw err;
    }
    else {
        await findSpotbyId.destroy();
        res.json({message: 'Successfully deleted'})
    }
})



module.exports = router;
