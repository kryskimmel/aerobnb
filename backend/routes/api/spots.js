const express = require('express');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Spot } = require('../../db/models');
const { User } = require('../../db/models');

const router = express.Router();


const validateSpotCreation = [
    check('address')
        .exists({ checkFalsy: true})
        .isLength({ min: 5 })
        .isString()
        .withMessage('The address provided must be at least 5 characters long'),
    check('city')
        .exists({ checkFalsy: true})
        .isLength({ min: 2 })
        .isString()
        .withMessage('The city provided must be at least 2 characters long'),
    check('state')
        .exists({ checkFalsy: true})
        .isLength({ min: 2 })
        .isString()
        .withMessage('The state provided must be at least 2 characters long'),
    check('country')
        .exists({ checkFalsy: true})
        .isLength({ min: 2 })
        .isString()
        .withMessage('The country provided must be at least 2 characters long'),
    check('lat')
        .exists({ checkFalsy: true})
        .isInt()
        .withMessage('The input for latitude must be in number form'),
    check('lng')
        .exists({ checkFalsy: true})
        .isInt()
        .withMessage('The input for longitude must be in number form'),
    check('name')
        .exists({ checkFalsy: true})
        .isLength({ min: 2})
        .isString()
        .withMessage('The name provided must be at least 2 characters long'),
    check('description')
        .exists({ checkFalsy: true})
        .isLength({ min: 2})
        .isString()
        .withMessage('The description provided must be at least 2 characters long'),
    check('price')
        .exists({ checkFalsy: true})
        .isInt()
        .withMessage('The input for price must be in number form'),
    handleValidationErrors
  ];






//get all spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();

    res.json(getAllSpots)
})


//create a spot
router.post('/', requireAuth, validateSpotCreation, async (req, res, next) => {
    const { address, city, state,
            country, lat, lng,
            name, description, price } = req.body;

    const createASpot = await Spot.create({
        address, city, state, country, lat,
        lng, name, description, price
    });

    const createdSpot = {
        id: spot.id,
        ownerId: User.id,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price
    }

    return res.json({
        createdSpot
    })
})



module.exports = router;
