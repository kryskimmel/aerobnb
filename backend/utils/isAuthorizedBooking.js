const { Booking } = require('../db/models');

const isAuthorizedBooking = async function (req, res, next) {
    const findBookingbyId = await Booking.findByPk(req.params.bookingId);

    if (req.user.id === findBookingbyId.userId){
        return next();
    }
    else {
        const err = {message: 'Forbidden'}
        res.status(403).json(err)
    }
};

module.exports = {isAuthorizedBooking}
