const { Spot } = require('../db/models');

const isAuthorized = async function (req, res, next) {
    const findSpotbyId = await Spot.findByPk(req.params.spotId)
    if (req.user.id === findSpotbyId.ownerId){
        return next();
    }
    else {
        const err = new Error('Forbidden');
        err.message = 'Forbidden';
        err.status = 403
        delete err.stack;
        err.title = 'Forbidden Request';
        return next(err)
    }
};

module.exports = {isAuthorized}
