const express = require('express');
const { Sequelize, Op, ValidationError, where } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { validateSpot } = require('../../utils/validate');
const { validateReview } = require('../../utils/validate');
const { isAuthorizedSpot } = require('../../utils/authorization');
const { existSpot } = require('../../utils/notFound');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const router = express.Router();


/****************************************************** */
//Get all spots
router.get( '/', async (req, res) => {
    const getAllSpots = await Spot.findAll({
        include: [
        {
            model: Review,
            as: 'avgRating',
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
        if (key.preview === true){ attribute.previewImage = key.url }
        })
    });


    const averageRatingObj = {};

    spotsList.forEach(attribute => {
        attribute.avgRating.forEach(key => {

            const { spotId, stars } = key;

            if (!averageRatingObj[spotId]){
                averageRatingObj[spotId] = {
                    sum: 0,
                    count: 0
                }
            }
            averageRatingObj[spotId].sum += stars;
            averageRatingObj[spotId].count++;


            Object.keys(averageRatingObj).map(spotId => {
                const { sum, count } = averageRatingObj[spotId];
                const avg = sum/count
                averageRatingObj[spotId].average = avg
                console.log(spotId, avg)

                if(key.stars) { attribute.avgRating = avg }
            })
       })
    });
    return res.json({"Spots": spotsList})
});


/****************************************************** */
//Get all spots owned by the current user
router.get( '/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const getSpotsByCurrUser = await Spot.findAll({
        where: {ownerId},
        include: [
            {
                model: Review,
                as: 'avgRating',
            },
            {
                model: SpotImage,
                as: 'previewImage',
            }]
    });
    const spotsList = [];
    getSpotsByCurrUser.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(attribute => {
        attribute.previewImage.forEach(key => {
        if (key.preview === true){ attribute.previewImage = key.url }
        })
    });

    const averageRatingObj = {};

    spotsList.forEach(attribute => {
        attribute.avgRating.forEach(key => {

            const { spotId, stars } = key;

            if (!averageRatingObj[spotId]){
                averageRatingObj[spotId] = {
                    sum: 0,
                    count: 0
                }
            }
            averageRatingObj[spotId].sum += stars;
            averageRatingObj[spotId].count++;


            Object.keys(averageRatingObj).map(spotId => {
                const { sum, count } = averageRatingObj[spotId];
                const avg = sum/count
                averageRatingObj[spotId].average = avg
                console.log(spotId, avg)

                if(key.stars) { attribute.avgRating = avg }
            })
       })
    });

    return res.json({"Spots": spotsList})
});


/****************************************************** */
//Get details of a spot from an id
router.get( '/:spotId', existSpot, async (req, res, next) => {
    const findSpotById = await Spot.findOne({
        where: {id: req.params.spotId},
        include: [{
            model: Review,
            as: 'numReviews'
        },
        {
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

    const spotsList = [];
    spotsList.push(findSpotById.toJSON());

    const averageRatingObj = {};

    spotsList.forEach(attribute => {
        attribute.avgStarRating.forEach(key => {

            const { spotId, stars } = key;

            if (!averageRatingObj[spotId]){
                averageRatingObj[spotId] = {
                    sum: 0,
                    count: 0
                }
            }
            averageRatingObj[spotId].sum += stars;
            averageRatingObj[spotId].count++;


            Object.keys(averageRatingObj).map(spotId => {
                const { sum, count } = averageRatingObj[spotId];
                const avg = sum/count
                averageRatingObj[spotId].average = avg
                console.log(spotId, avg)

                if (key.stars){
                    attribute.numReviews = count
                    attribute.avgStarRating = avg
                }
            });
       })
    });

        return res.json(...spotsList);
});


/****************************************************** */
//Create a spot
router.post( '/', requireAuth, validateSpot, async (req, res, next) => {

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
router.post( '/:spotId/images', requireAuth, existSpot, isAuthorizedSpot, async (req, res, next) => {
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
router.post( '/:spotId/reviews', requireAuth, existSpot, validateReview, async (req, res, next) => {
    try {
        const { review, stars } = req.body;
        const findSpotbyId = await Spot.findByPk(req.params.spotId);
        const reviewExists = await Review.findAll({
            where: { spotId: req.params.spotId },
        });

        const reviewsList = [];
        const userIdList = [];
        reviewExists.forEach(spot => {
            reviewsList.push(spot.toJSON())
        });

        reviewsList.forEach(attribute => {
            userIdList.push(attribute.userId)
        })

        if (findSpotbyId && !userIdList.includes(req.user.id)) {
            const addReview = await Review.create({
                userId: req.user.id,
                spotId: parseInt(req.params.spotId),
                review,
                stars
            })
            return res.status(201).json(addReview)
        }
         if (userIdList.includes(req.user.id)){
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
router.get( '/:spotId/reviews', existSpot, async (req, res, next) => {

    const removeSpotAttributes = Spot.scope('removeAttributes')
    const findSpotbyId = await removeSpotAttributes.findOne({
        where: {id : req.params.spotId},
        include: [{
            model: Review,
            include: [{model: User}, {model: ReviewImage}]
        }]
    });
    return res.json(findSpotbyId)
})


/****************************************************** */
//Get all bookings for a spot based on the spot's id
router.get( '/:spotId/bookings', requireAuth, existSpot, async (req, res) => {

    const findSpotbyId = await Spot.findByPk(req.params.spotId);
    const removeSpotAttributes = Spot.scope('removeAttributes');

    if (req.user.id !== findSpotbyId.ownerId) {
        const notSpotOwner = await removeSpotAttributes.findOne({
            where: {id : req.params.spotId},
            include:
            {model: Booking, attributes: ["spotId", "startDate", "endDate"]}
        });
        return res.json(notSpotOwner)
    }

    else {
        const spotOwner = await removeSpotAttributes.findOne({
            where: {id: req.params.spotId},
            include:
            {
                model: Booking,
                include: {model: User},
            }
        });
        return res.json(spotOwner)
    }
});


/****************************************************** */
//Create a booking from a spot based on the spot's id
router.post( '/:spotId/bookings', requireAuth, existSpot, async (req, res, next) => {
    try{
        const { startDate, endDate } = req.body;
        const findSpotbyId = await Spot.findByPk(req.params.spotId);
        const bookingExists = await Booking.findAll({
            where: {spotId: req.params.spotId}
        });

        if (findSpotbyId && req.user.id !== findSpotbyId.ownerId && !bookingExists) {
            const createBooking = await Booking.create({
                spotId: findSpotbyId.id,
                userId: req.user.id,
                startDate,
                endDate
            });
            return res.json(createBooking)
        }
        // else if (bookingExists) {
        //     return res.status(403).json({
        //         message : 'Sorry, this spot is already booked for the specified dates',
        //         errors: {
        //             startDate: ''
        //         }
        //     })
        // }
    }
    catch (err){
        err.status = 400;
        next(err);
    }
    })







/****************************************************** */
//Edit a spot
router.put( '/:spotId', requireAuth, existSpot, isAuthorizedSpot, validateSpot, async (req, res, next) => {
    try{
        const findSpotById = await Spot.findByPk(req.params.spotId);
        if (findSpotById){
            const { address, city, state,
                    country, lat, lng,
                    name, description, price } = req.body;

            const updatedSpot = await findSpotById.update({
                address, city, state,
                country, lat, lng,
                name, description, price
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
router.delete( '/:spotId', requireAuth, existSpot, isAuthorizedSpot, async (req, res) => {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (findSpotbyId){
        await findSpotbyId.destroy();
        res.json({message: 'Successfully deleted'})
    }
});



module.exports = router;
