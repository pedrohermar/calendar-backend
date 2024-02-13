/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validateJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

// Validación de JWT para todas
router.use( validateJWT )

// // Obtener eventos
router.get('/', getEvents)

// // Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validateFields
    ],
    createEvent
)

// // Actualizar evento
router.put(
    '/:id',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validateFields
    ],
    updateEvent
)

// // Borrar evento
router.delete(
    '/:id',
    deleteEvent
)

module.exports = router;