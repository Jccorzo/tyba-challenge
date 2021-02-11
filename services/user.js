const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

module.exports.createUser = async (user) => {
    try {
        const securePass = crypto.createHash('md5').update(user.password).digest('hex');
        const newUser = new User({ ...user, password: securePass });
        await newUser.save()
        const userToken = jwt.sign({
            user: user.username,
        }, config.jwt, {
            algorithm: "HS512",
        });
        return { message: 'Usuario creado correctamente', token: userToken }
    } catch (e) {
        console.log(e)
        throw new Error('Ocurrió un error creando el usuario')
    }
}

module.exports.getUser = async (user) => {
    const users = await User.where({ username: user.username })
    if (users.length > 0) {
        const securePass = crypto.createHash('md5').update(user.password).digest('hex');
        if (securePass === users[0].password) {
            delete (users[0].password)
            const userToken = jwt.sign({
                user: user.username,
            }, config.jwt, {
                algorithm: "HS512",
            });
            return { token: userToken }
        } else {
            throw new Error('Contraseña incorrecta')
        }
    } else {
        throw new Error('El usuario no existe')
    }
}

