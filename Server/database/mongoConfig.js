require('dotenv').config()

const mongoose = require('mongoose')
// mudar para função normal
const conectBd = (app, port)=>{
  
  //credenciais de acesso ao bando mongodb
  const dbUser = process.env.DB_USER
  const dbPass = process.env.DB_PASS
  const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.342q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  
  // Conectando o Banco de dados
  mongoose.connect(uri).then(() => {
      app.listen(port)
      console.log('Banco de Dados Conectado')
      console.log(`Sevidor conectado na porta ${port}`)
  }).catch((error) => console.log(error))
}

module.exports = conectBd
