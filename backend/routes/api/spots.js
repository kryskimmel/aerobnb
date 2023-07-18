const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { isAuthorized } = require('../../utils/authorization');
const { spotNotFound } = require('../../utils/spotNotFound');
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
router.get( '/:spotId', spotNotFound, async (req, res, next) => {
    const findSpotById = await Spot.findOne({
        where: {id: req.params.spotId},
        include: [{
            model: Review,
            as: 'avgStarRating'
        },
        {
            model: SpotImage,
        },
        {
            model: User,
            as: 'Owner',
        }]
    });
        return res.json(findSpotById);
});


/****************************************************** */
//Create a spot
router.post( '/', requireAuth, handleValidationErrors, async (req, res, next) => {

    try {
        const { address, city, state,
            country, lat, lng,
            name, description, price } = req.body;

        const createSpot = await Spot.create({
            ownerId: req.user.id,
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
router.post( '/:spotId/images', spotNotFound, requireAuth, isAuthorized, async (req, res, next) => {
    const { url, preview } = req.body;

    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (findSpotbyId){
        const createImage = await SpotImage.create({
            spotId: parseInt(req.params.spotId),
            url,
            preview
        });

        return res.json({
            id: createImage.id,
            url,
            preview
        });
    }
});


/****************************************************** */
//Create a review for a spot based on the Spot's id
router.post( '/:spotId/reviews', spotNotFound, requireAuth, handleValidationErrors, async (req, res, next) => {
    try {
        const { review, stars } = req.body;
        const findSpotbyId = await Spot.findByPk(req.params.spotId);
        const reviewExists = await Review.findOne({where: {
            spotId: req.params.spotId
        }})
        if (findSpotbyId && !reviewExists) {
            const addReview = await Review.create({
                userId: req.user.id,
                spotId: parseInt(req.params.spotId),
                review,
                stars
            })

            return res.status(201).json(addReview)
        }
        else if (reviewExists){
            return res.status(500).json({'message' : 'User already has a review for this spot'})
        }
    }
    catch (err) {
        err.status = 400;
        next(err)
    }
});


/****************************************************** */
//Get all reviews by a spot's id
// router.get( '/:spotId/reviews', notFound, (req, res, next))


/****************************************************** */
//Edit a spot
router.put( '/:spotId', spotNotFound, requireAuth, isAuthorized, async (req, res, next) => {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    try{
        if (findSpotbyId){
            const { address, city, state,
                    country, lat, lng,
                    name, description, price } = req.body;

            const updatedSpot = await findSpotbyId.update({
                address, city, state,
                country, lat, lng,
                name, description, price
            }, {
                where: { id: req.params.spotId }
            });

            return res.json(updatedSpot);
        }
    }
    catch (err) {
        err.status = 400;
        next(err)
    }
});



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
