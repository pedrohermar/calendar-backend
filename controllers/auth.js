const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Consultamos si el usuario ya existe
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        };

        // Creamos usuario en caso de que no exista
        user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        await user.save();

        // Generar JWT
        const token = await generateJWT( user.id, user.name )
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    };

};

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Consultamos si el usuario ya existe
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese email'
            });
        };

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, user.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        };

        // Generar JWT
        const token = await generateJWT( user.id, user.name )

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    };

};

const renewToken = async(req, res = response) => {

    const { uid, name } = req

    const token = await generateJWT( uid, name )

    res.json({
        ok: true,
        token
    });

};

module.exports = {
    createUser,
    loginUser,
    renewToken
};