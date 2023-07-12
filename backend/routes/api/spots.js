const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const user = require('../../db/models/user');
const router = express.Router();


//Get all spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();
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

    } catch (error) {
        error.status = 400;
        next (error);
    }
});



module.exports = router;
