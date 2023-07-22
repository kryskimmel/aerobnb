const { check } = require('express-validator');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');



const validateLogin = [
check('credential')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage('Email or username is required.'),
check('password')
    .exists({ checkFalsy: true }).withMessage('Password is required.'),
handleValidationErrors
];


const validateSignup = [
check('email')
    .exists({ checkFalsy: true }).withMessage('Email is required')
    .notEmpty().withMessage('Invalid email')
    .isEmail().withMessage('Invalid email'),
check('username')
    .exists({ checkFalsy: true }).withMessage('Username is required')
    .notEmpty().withMessage('Username is required')
    .not().isEmail().withMessage('Username cannot be an email.'),
check('password')
    .exists({ checkFalsy: true }).withMessage('Password is required')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be 6 characters or more.'),
check('firstName')
    .exists({checkFalsy: true}).withMessage('First Name is required')
    .notEmpty().withMessage('First Name is required'),
check('lastName')
    .exists({checkFalsy: true}).withMessage('Last Name is required')
    .notEmpty().withMessage('Last Name is required'),
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
    .isDecimal().withMessage('Latitude is not valid')
    .not().isString().withMessage('Latitude is not valid')
    .notEmpty().withMessage('Latitude is not valid'),
check('lng')
    .exists({ checkFalsy: true })
    .isDecimal().withMessage('Longitude is not valid')
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
    .isInt()
    .not().isString().withMessage('Star rating is not valid')
    .isIn([1, 2, 3, 4, 5]).withMessage('Stars must be an integer from 1 to 5')
    .notEmpty().withMessage('Star rating is not valid'),
handleValidationErrors
];



const currDateISO = new Date().toISOString();
const currDateOnly = currDateISO.slice(0,10);
const isValidDate = /^\d{4}-\d{2}-\d{2}$/;

const validateBooking = [
check('startDate')
    .custom((value, {req, location, path}) => {
        if (value >= req.body.endDate) {throw new Error('startDate cannot be on or after endDate')} return true;
    }),
check('endDate')
    .custom((value, {req, location, path}) => {
        if (value <= req.body.startDate) {throw new Error('endDate cannot be on or before startDate')} return true;
    }),
check('startDate').isDate({format: "YYYY-MM-DD"}).withMessage("startDate must be in YYYY-MM-DD format"),
check('endDate').isDate({format: "YYYY-MM-DD"}).withMessage("endDate must be in YYYY-MM-DD format"),
handleValidationErrors
];


const validateQueryParameter = [
query('page')
    .optional()
    .isInt({min: 1}).withMessage('Page must be greater than or equal to 1')
    .isInt({max: 10}).withMessage('Page must be less than 10')
    .not().isAlpha().withMessage('Page numbers must be a whole number')
    .notEmpty().withMessage('Please input a page number in the URL'),
query('size')
    .optional()
    .isInt({min: 1}).withMessage('Size must be greater than or equal to 1')
    .isInt({max: 20}).withMessage('Size must be less than 20')
    .not().isAlpha().withMessage('Size must be a whole number')
    .notEmpty().withMessage('Please input a size in the URL'),
query('maxLat')
    .optional()
    .isFloat({min: -190, max: 190}).withMessage('Maximum latitude is invalid')
    .not().isAlpha().withMessage('Maxiumum latitude must be a decimal')
    .notEmpty().withMessage('Please input a maximum latitude in the URL'),
query('minLat')
    .optional()
    .isFloat({min: -190, max: 190}).withMessage('Minimum latitude is invalid')
    .not().isAlpha().withMessage('Minimum latitude must be a decimal')
    .notEmpty().withMessage('Please input a minimum latitude in the URL'),
query('maxLng')
    .optional()
    .isFloat({min: -190, max: 190}).withMessage('Maximum longitude is invalid')
    .not().isAlpha().withMessage('Maxiumum longitude must be a decimal')
    .notEmpty().withMessage('Please input a maximum longitude in the URL'),
query('minLng')
    .optional()
    .isFloat({min: -190, max: 190}).withMessage('Minimum longitude is invalid')
    .not().isAlpha().withMessage('Minimum longitude must be a decimal')
    .notEmpty().withMessage('Please input a minimum longitude in the URL'),
query('minPrice')
    .optional()
    .isInt({min: 0}).withMessage('Minimum price must be greater than or equal to 0')
    .not().isAlpha().withMessage('Minimum price must be a decimal or whole number')
    .notEmpty().withMessage('Please input a minimum price in the URL'),
query('maxPrice')
    .optional()
    .isInt({min: 0}).withMessage('Maximum price must be greater than or equal to 0')
    .not().isAlpha().withMessage('Maximum price must be a decimal or whole number')
    .notEmpty().withMessage('Please input a maximum price in the URL'),
 handleValidationErrors
]


module.exports = {
    validateLogin,
    validateSignup,
    validateSpot,
    validateReview,
    validateBooking,
    validateQueryParameter
  };
