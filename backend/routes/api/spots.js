const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Spot } = require('../../db/models');

//get all spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();

    res.json(getAllSpots)
})


module.exports = router;
