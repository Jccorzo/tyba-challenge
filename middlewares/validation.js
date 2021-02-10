const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.validateLogin = (req, res, next) => {
    if (req.baseUrl === '/user/login' || req.baseUrl === '/user/signUp') return next()
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verificarToken = jwt.verify(token, config.jwt)
        if (verificarToken) {
            req.user = verificarToken;
            return next()
        }
    } catch (e) {
        res.status(401).json({ message: 'error de autenticacion' })
    }
}

module.exports.validateSignUpForm = (req, res, next) => {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
        res.status(401).json({ message: "Todos los campos son obligatorios" })
    } else {
        next()
    }
}

module.exports.validateLoginForm = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).json({ message: "Usuario o contraseña incorrecto" })
    } else {
        next()
    }
}