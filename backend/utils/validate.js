const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');


const validateLogin = [
check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
handleValidationErrors
];

const validateSignup = [
check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
handleValidationErrors
];


const validateSpot = [
check('address')
.exists({ checkFalsy: true })
    .isString().withMessage('Please provide a street address that uses letters or alphanumeric characters')
    .isLength({min: 5}).withMessage('Street address must have a minimum of 5 characters')
    .isLength({max: 50}).withMessage('Street address must be less than 50 characters')
    .notEmpty().withMessage('Street address is required'),
check('city')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a city that uses alphabetic characters')
    .isLength({min: 2}).withMessage('City must have a minimum of 2 characters')
    .isLength({max: 20}).withMessage('City must be less than 20 characters')
    .notEmpty().withMessage('City is required'),
check('state')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a state that uses alphabetic characters')
    .isLength({min: 2}).withMessage('State must have a minimum of 2 characters')
    .isLength({max: 20}).withMessage('State must be less than 20 characters')
    .notEmpty().withMessage('State is required'),
check('country')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a country that uses alphabetic characters')
    .isLength({min: 2}).withMessage('Country must have a minimum of 2 characters')
    .isLength({max: 20}).withMessage('Country must be less than 20 characters')
    .notEmpty().withMessage('Country is required'),
check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .not().isString().withMessage('Latitude is not valid')
    .notEmpty().withMessage('Latitude is not valid'),
check('lng')
    .exists({ checkFalsy: true })
    .isDecimal()
    .not().isString().withMessage('Longitude is not valid')
    .notEmpty().withMessage('Longitude is not valid'),
check('name')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a name that uses alphabetic characters')
    .isLength({min: 2}).withMessage('Name must have a minimum of 2 characters')
    .isLength({max: 50}).withMessage('Name must be less than 50 characters')
    .notEmpty().withMessage('Name is required'),
check('description')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a description that uses alphabetic characters')
    .isLength({min: 2}).withMessage('Description must have a minimum of 2 characters')
    .isLength({max: 500}).withMessage('Description must be less than 500 characters')
    .notEmpty().withMessage('Description is required'),
check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .not().isString().withMessage('Price is not valid')
    .notEmpty().withMessage('Price per day is required'),
handleValidationErrors
];


const validateReview = [
check('review')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a review that uses letters or alphanumeric characters')
    .isLength({min: 2}).withMessage('Review must have a minimum of 2 characters')
    .isLength({max: 500}).withMessage('Review must be less than 500 characters')
    .notEmpty().withMessage('Review text is required'),
check('stars')
    .exists({ checkFalsy: true })
    .isDecimal()
    .not().isString().withMessage('Star rating is not valid')
    .isIn([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).withMessage('Stars must be an integer from 1 to 5')
    .notEmpty().withMessage('Star rating is not valid'),
handleValidationErrors
];





module.exports = {
    validateLogin,
    validateSignup,
    validateSpot,
    validateReview,
  };
