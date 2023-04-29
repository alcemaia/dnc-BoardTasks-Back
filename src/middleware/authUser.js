const jwt = require('jsonwebtoken');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function authUser(req, res, next) { //parametros que são necessarios para um middleware req, res, next 
    const token = req.headers['x-auth-token']; //cabeçario da requisição

    if (!token) { //! significa que ele vai ser ao contrario do valor padrão do token
        return tratarErrosEsperados(res, new Error("Token de autenticação não fornecido")); //se não for preenhido o token ele retorna esa função
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //frscriptografar o token

        req.usuarioJwt = decoded;

        next();
    } catch (error) {
        console.error(error);
        return tratarErrosEsperados(res, new Error("Token de autenticação inválido"));
    }
}

module.exports = authUser;
