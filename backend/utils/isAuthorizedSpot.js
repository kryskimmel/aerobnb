const { Spot } = require('../db/models');

const isAuthorizedSpot = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId);

    if (req.user.id === findSpotbyId.ownerId){
        return next();
    }
    else {
        const err = {message: 'Forbidden'}
        res.status(403).json(err)
    }
};

module.exports = {isAuthorizedSpot}
