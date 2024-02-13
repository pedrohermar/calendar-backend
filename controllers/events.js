const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })

};

const createEvent = async (req, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        await event.save();

        res.json({
            ok: true,
            event
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {

        const event = await Event.findById( eventId )

        if( !event ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } ); // new true para que la variable devuelva el valor actualizado, y no el anterior.

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    };

};

const deleteEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteEvent'
    })

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}