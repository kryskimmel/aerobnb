const { Spot } = require('../db/models');

const spotNotFound = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId)
    if (findSpotbyId){
        return next();
    }
    else {
        const err = {message: 'Spot couldn\'t be found'}
        res.status(404).json(err)
    }
};

module.exports = {spotNotFound}
