// passo a passo
// importar o express
// definir o app atribuindo a função express
   
const express = require('express');
const app = express();

// configurar rotas

const index = require('./routes/index');
const livros = require('./routes/livrosRoutes');
const funcionarios = require('./routes/funcionariosRoutes');



app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )  
  next()
})


app.use('/', index);
app.use('/livros', livros)
app.use('/funcionarios', funcionarios)

// exportar o app
    
module.exports = app