const User = require('../models/User')
const bcrypt = require('bcrypt')

const registerUser = (app) =>{
    
    // Endpoint para registro de usuários
    app.post('/auth/register', async (req, res) => {
        const { password, email } = req.body
        console.log(1)
        // Validação de campos
        if (!password  || !email) {
        return res.status(422).json({ msg: 'Preencha todos os campos!' })
        }
        console.log(2)
        try {
            console.log(3)
        // Verificação de senhas ja cadastradas
        const existingUser = await User.findOne({ email: email })
        console.log(4)
        if (existingUser) {
            console.log(`Usuário de acesso já cadastrado!`)
            return res.status(422).json({ msg: 'Usuário de acesso já cadastrado!' })
        }
        console.log(5)
         // Verificação de senha já cadastrada
         const users = await User.find() // Obtém todos os usuários
         console.log(6)
         for (const user of users) {
             const isSamePassword = await bcrypt.compare(password, user.password)
             if (isSamePassword) {
                 console.log('Senha já utilizada por outro usuário!')
                 return res.status(422).json({ msg: 'Senha já utilizada por outro usuário!' })
             }
         }
         console.log(7)
    
        // Criação de Hash na senha
        const salt = await bcrypt.genSalt(   )
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(8)
        // Criação do usuário
        const user = new User({
            email: email, 
            password: passwordHash 
        })
        console.log(9)
        await user.save()
        console.log('Usuário cadastrado com sucesso!')
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' })

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message)
            res.status(500).json({ msg: 'Erro interno do servidor' })
        }
    })
}

module.exports = registerUser
