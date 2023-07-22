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
    .isEmail().withMessage('Invalid email')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Invalid email');
        }
        return true;
      }),
check('username')
    .exists({ checkFalsy: true }).withMessage('Username is required')
    .notEmpty().withMessage('Username is required')
    .isAlphanumeric().withMessage('Username is required')
    .not().isEmail().withMessage('Username cannot be an email.')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Username is required');
        }
        return true;
      }),
check('password')
    .exists({ checkFalsy: true }).withMessage('Password is required')
    .notEmpty().withMessage('Password is required')
    .isAlphanumeric().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be 6 characters or more.')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Password is required');
        }
        return true;
      }),
check('firstName')
    .exists({checkFalsy: true}).withMessage('First Name is required')
    .notEmpty().withMessage('First Name is required')
    .isAlpha().withMessage('First name is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('First Name is required');
        }
        return true;
      }),
check('lastName')
    .exists({checkFalsy: true}).withMessage('Last Name is required')
    .notEmpty().withMessage('Last Name is required')
    .isAlpha().withMessage('Last name is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Last Name is required');
        }
        return true;
      }),
handleValidationErrors
];



const validateSpot = [
check('address')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage('Street address is required')
    .isString().withMessage('The address field must contain only alphanumeric characters and spaces')
    .matches(/^[\w\-\s]+$/).withMessage('Street address is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Street address is required');
        }
        return true;
      }),
check('city')
    .exists({ checkFalsy: true }).withMessage('City is required')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('The city field must contain only alphabetical characters and spaces')
    .not().isNumeric().withMessage('The city field must contain only alphabetical characters and spaces')
    .not().isNumeric().withMessage('The city field must contain only alphabetical characters and spaces')
    .matches(/^[a-z\s]*$/i).withMessage('City is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('City is required');
        }
        return true;
      }),
check('state')
    .exists({ checkFalsy: true }).withMessage('State is required')
    .notEmpty().withMessage('State is required')
    .isString().withMessage('The state field must contain only alphabetical characters and spaces')
    .not().isNumeric().withMessage('The state field must contain only alphabetical characters and spaces')
    .matches(/^[a-z\s]*$/i).withMessage('State is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('State is required');
        }
        return true;
      }),
check('country')
    .exists({ checkFalsy: true }).withMessage('Country is required')
    .notEmpty().withMessage('Country is required')
    .isString().withMessage('The country field must contain only alphabetical characters and spaces')
    .not().isNumeric().withMessage('The country field must contain only alphabetical characters and spaces')
    .matches(/^[a-z\s]*$/i).withMessage('Country is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Country is required');
        }
        return true;
      }),
check('lat')
    .exists({ checkFalsy: true }).withMessage('Latitude is not valid')
    .notEmpty().withMessage('Latitude is not valid')
    .isDecimal().withMessage('Latitude is not valid')
    .isFloat({min: 0}).withMessage('Latitude is not valid')
    .isNumeric().withMessage('Latitude is not valid')
    .not().isString().withMessage('Latitude is not valid')
    .not().isInt().withMessage('Latitude is not valid'),
check('lng')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage('Longitude is not valid')
    .isDecimal().withMessage('Longitude is not valid')
    .isFloat({min: 0}).withMessage('Longitude is not valid')
    .isNumeric().withMessage('Longitude is not valid')
    .not().isString().withMessage('Longitude is not valid')
    .not().isInt().withMessage('Longitude is not valid'),
check('name')
    .exists({ checkFalsy: true }).withMessage('Name is required')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('The name field must contain only alphanumeric characters and spaces')
    .isLength({min: 1}).withMessage('Name is required')
    .isLength({max: 50}).withMessage('Name must be less than 50 characters')
    .matches(/^[\w\-\s]+$/).withMessage("Name must be less than 50 characters")
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Name is required');
        }
        return true;
      }),
check('description')
    .exists({ checkFalsy: true })
    .isString().withMessage('Please provide a description that uses alphabetic characters')
    .notEmpty().withMessage('Description is required')
    .custom((value, { req }) => {
        if (value.trim().length === 0) {
          throw new Error('Description is required');
        }
        return true;
      }),
check('price')
    .exists({ checkFalsy: true })
    .notEmpty().withMessage('Price per day is required')
    .isNumeric().withMessage('Price per day is required')
    .isInt({min: 0}).withMessage('Price per day is required')
    .not().isString().withMessage('Price per day is required'),
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
