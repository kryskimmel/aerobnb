const { Booking } = require('../db/models');

const bookingNotFound = async function (req, res, next) {
    const findBookingById = await Booking.findByPk(req.params.bookingId)
    if (findBookingById){
        return next();
    }
    else {
        const err = {message: 'Booking couldn\'t be found'}
        res.status(404).json(err)
    }
};

module.exports = {bookingNotFound}
