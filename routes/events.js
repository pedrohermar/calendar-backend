/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const router = Router();

const { validateJWT } = require('../middlewares/validateJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

// // Obtener eventos
router.get('/', validateJWT, getEvents)

// // Crear un nuevo evento
router.post('/', validateJWT, createEvent)

// // Actualizar evento
router.put('/:id', validateJWT, updateEvent)

// // Borrar evento
router.delete('/:id', validateJWT, deleteEvent)

module.exports = router;