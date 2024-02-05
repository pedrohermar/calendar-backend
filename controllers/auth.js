const { response } = require('express');

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'registro'
    });

}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login'
    });

}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    });

}

module.exports = {
    createUser,
    loginUser,
    renewToken
}