const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');

//get all spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();

    res.json(getAllSpots)
})


//create a spot
router.post('/', async (req, res, next) => {
    const { address, city, state,
            country, lat, lng,
            name, description, price } = req.body;

    const createSpot = await Spot.create({
        address, city, state, country, lat,
        lng, name, description, price
    });

    const spot = {
        id: spot.id,

    }
})



module.exports = router;
