require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    // Verificaçãp do cabeçalho
    if (!authHeader) {
        return res.status(401).json({ msg: 'Acesso negado! Token não fornecido.' })
    }

    // Extrai o token do cabeçalho
    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado! Token inválido ou ausente.' })
    }

    try {
        // Verificação do token
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        console.log('Token válido!')

        next()

    } catch (error) {
        console.error('Erro ao verificar token:', error.message)
        return res.status(501).json({ msg: 'Token inválido!' })
    }
}

module.exports = verifyToken