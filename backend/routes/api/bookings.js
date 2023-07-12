const express = require('express');
const { Sequelize, Op, ValidationError } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const user = require('../../db/models/user');
const router = express.Router();





module.exports = router;
