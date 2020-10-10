const funcionarios = require('../model/funcionarios.json');
const fs = require('fs');

const getFuncionarios = (req, res) => {
    res.status(200).send(funcionarios)
};

const getFuncionarioById =(req, res) =>{
  const id = req.params.id;
  const funcionarioFiltrado = funcionarios.filter((funcionario) => funcionario.id == id);
  res.status(200).send(funcionarioFiltrado);
}     

const postFuncionario = (req, res) => {
    console.log(req.body);
    const {id, nome, rg, cpf, idade} = req.body;
    funcionarios.push({id, nome, rg, cpf, idade});

    fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionarios), "utf-8", function(err){
      if (err){
  return res.status(424).send({message:err});
} 
console.log("Arquivo adicionado e atualizado com sucesso!");   
});

    res.send(200).send(funcionarios)
  };

 const deleteFuncionario = (req, res) =>{
    const id = req.params.id;
    const funcionarioFiltrado = funcionarios.find((funcionario) => funcionario.id == id);
    const index = funcionarios.indexOf(funcionarioFiltrado);
    funcionarios.splice(index, 1);

    fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionarios), "utf8", function(err) {
     if (err) {
       return res.status(424).send({ message: err});
     }
     console.log("Arquivo deletado e atualizado com sucesso!");
    })

    res.status(200).send(funcionarios);

    } 
    module.exports = { 
        getFuncionarios, 
        postFuncionario,
        deleteFuncionario,
        getFuncionarioById
    };
