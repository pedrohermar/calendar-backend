/*
    Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

router.post(
    '/new',
    // Middlewares
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
     createUser
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],     
    loginUser
);

router.get('/renew', renewToken);

module.exports = router;