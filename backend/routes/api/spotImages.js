const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const router = express.Router();




module.exports = router;
