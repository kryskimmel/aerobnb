const express = require('express');
const { Sequelize, Op, ValidationError, DATEONLY } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { existBooking } = require('../../utils/notFound');
const { isAuthorizedSpot } = require('../../utils/authorization');
const { isAuthorizedBooking } = require('../../utils/authorization');
const { Booking, Spot } = require('../../db/models');
const { validateBooking } = require('../../utils/validate');
const router = express.Router();


/****************************************************** */
//Get all of the current user's bookings
router.get( '/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const getBookingsByCurrUser = await Booking.findAll({
        where: {userId},
        include: {
            model: Spot,
            attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
            include: 'previewImage'
        },
    });

    const bookingsList = [];
    getBookingsByCurrUser.forEach(booking => {
        bookingsList.push(booking.toJSON())
    });

    bookingsList.forEach(attribute => {
        const {previewImage} = attribute.Spot;
        previewImage.forEach(key => {
            if (key.preview === true){attribute.Spot.previewImage = key.url}
       })
    });
    return res.json({"Bookings": bookingsList})
});


/****************************************************** */
//Edit a booking
router.put('/:bookingId', requireAuth, existBooking, isAuthorizedBooking, validateBooking, async (req, res, next) => {
    try{
        const findBookingbyId = await Booking.findByPk(req.params.bookingId);
        if (findBookingbyId){
            const { startDate, endDate } = req.body;
            const currDateISO = new Date().toISOString();
            const currDateOnly = currDateISO.slice(0,10);

            if (currDateOnly > findBookingbyId.endDate)
                { return res.status(403).json({message: "Past bookings can't be modified"})}

            else if (currDateOnly > findBookingbyId.startDate && currDateOnly < findBookingbyId.endDate)
                { return res.status(403).json({message: "Past bookings can't be modified"})}

            else if (startDate === findBookingbyId.startDate && endDate === findBookingbyId.endDate)
                { return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates"})}

            else if (   startDate === findBookingbyId.startDate ||
                        startDate === findBookingbyId.endDate ||
                        startDate >= findBookingbyId.startDate && (endDate > findBookingbyId.startDate && endDate <= findBookingbyId.endDate) ||
                        startDate <= findBookingbyId.startDate && (endDate > findBookingbyId.startDate && endDate <= findBookingbyId.endDate)
                    )
                    { return res.status(403).json({message: "Start date conflicts with an existing booking"})}

            else if (   endDate === findBookingbyId.endDate ||
                        endDate === findBookingbyId.startDate
                    )
                    { return res.status(403).json({message: "End date conflicts with an existing booking"})}

            else {
                const updatedBooking = await findBookingbyId.update({
                    startDate,
                    endDate
                })

                return res.json({
                    id: findBookingbyId.id,
                    spotId: findBookingbyId.spotId,
                    userId: findBookingbyId.userId,
                    startDate,
                    endDate,
                    createdAt: findBookingbyId.createdAt,
                    updatedAt: findBookingbyId.updatedAt
                })
            }
        }
    }
    catch (err){
        err.status = 400
        next(err)
    }
});


/****************************************************** */
//Delete a booking
router.delete ('/:bookingId', requireAuth, existBooking, async (req, res) => {
    const findBooking = await Booking.findByPk(req.params.bookingId);

    const findBookingbyId = await Booking.findOne({
        where: {id: req.params.bookingId},
        include: {model: Spot}
    });

    if (req.user.id !== findBookingbyId.userId){
        return res.status(403).json({message: "Forbidden"})
    }

    const currDateISO = new Date().toISOString();
    const currDateOnly = currDateISO.slice(0,10);

    if (currDateOnly >= findBooking.startDate && currDateOnly <= findBooking.endDate) {
        return res.status(403).json({message: "Bookings that have been started can't be deleted"})
    }

    else {
        await findBooking.destroy();
        return res.json({message: 'Successfully deleted'})
    }
})


module.exports = router;
