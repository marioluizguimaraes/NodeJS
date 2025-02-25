require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authUser = (app) => {

    // Autenticação de login
    app.post("/auth/login", async (req, res) =>{
        
        const {password} = req.body

        if (!password) {
            return res.status(422).json({msg: 'Preencha todos os campos!'})
        }

        try {
            
            const users = await User.find()
            let user = null

            // Verifica o password para cada usuário
            for (const u of users) {
                const checkPas = await bcrypt.compare(password, u.password)
                if (checkPas) {
                    user = u
                    break
                }
            }

            // Verifica se um usuário foi encontrado
            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado ou senha inválida.' })
            }

            const emailUser = user.email
            const idUser = user._id            
            
            // definindo Token
            const secret = process.env.SECRET
            const token = jwt.sign({id: user._id},secret, {expiresIn: '24h'})
            console.log(`O usuário ${emailUser} fez login`)
            res.status(200).json({emailUser, idUser, token})
            
        } catch{
            console.error('Erro ao autenticar o usuário:', error.message)
            res.status(500).json({ msg: 'Erro ao autenticar o usuário:' })
        }
    })
}

module.exports = authUser