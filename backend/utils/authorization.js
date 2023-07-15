const { User, Spot } = require('../db/models');

const isAuthorized = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId)
    if (req.user.id === findSpotbyId.ownerId) return next

    const err = new Error('Forbidden');
    // err.title = 'Authentication required';
    err.errors = { message: 'Forbidden' };
    err.status = 403;
    return next(err);
}





module.exports = {isAuthorized}
