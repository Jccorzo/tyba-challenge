const { insert, get } = require('../database/methods');
const { newUser, savedUser } = require('../database/queries');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.createUser = async (user) => {
    try {
        const securePass = crypto.createHash('md5').update(user.password).digest('hex');
        await insert(newUser, { ...user, password: securePass, })
        delete (user.password)
        const userToken = jwt.sign({
            usuario: user.usuario,
        }, config.jwt, {
            algorithm: "HS512",
        });
        return { message: 'Usuario creado correctamente', token: userToken }
    } catch (e) {
        console.log(e.parent.sqlMessage)
        throw new Error('Ocurrió un error creando el usuario')
    }
}

module.exports.getUser = async (user) => {
    try {
        const foundUser = await get(savedUser, user)
        if (Array.isArray(foundUser) && foundUser.length > 0) {
            const securePass = crypto.createHash('md5').update(user.password).digest('hex');
            if (securePass === foundUser[0].password) {
                delete (foundUser[0].password)
                const userToken = jwt.sign({
                    usuario: user.username,
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
    } catch (e) {
        throw new Error(e.message)
    }
}
