const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const router = express.Router();

router.get( '/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const getReviewsByCurrUser = await Review.findAll({
        where: {userId}
    });
    return res.json(getReviewsByCurrUser)
})


module.exports = router;
