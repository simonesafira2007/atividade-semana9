const funcionarios = require("../model/funcionarios.json");
const fs = require("fs");

const getFuncionarios = (req, res) => {
  res.status(200).send(funcionarios);
};     

const getFuncionarioById = (req, res) => {
  const id = req.params.id;
  const funcionarioFiltrado = funcionarios.filter(
    (funcionario) => funcionario.id == id
  );
  res.status(200).send(funcionarioFiltrado);
};

const postFuncionario = (req, res) => {
  console.log(req.body);
  const { id, nome, rg, cpf, idade } = req.body;
  funcionarios.push({ id, nome, rg, cpf, idade });

  fs.writeFile(
    "./src/model/funcionarios.json",
    JSON.stringify(funcionarios),
    "utf-8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo adicionado e atualizado com sucesso!");
    }
  );

  res.send(200).send(funcionarios);
};

const deleteFuncionario = (req, res) => {
  const id = req.params.id;
  const funcionarioFiltrado = funcionarios.find(
    (funcionario) => funcionario.id == id
  );
  const index = funcionarios.indexOf(funcionarioFiltrado);
  funcionarios.splice(index, 1);

  fs.writeFile(
    "./src/model/funcionarios.json",
    JSON.stringify(funcionarios),
    "utf8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo deletado e atualizado com sucesso!");
    }
  );

  res.status(200).send(funcionarios);
};

// começa aqui
//Método PUT

const putFuncionario = (req, res) => {
  try {
    // pego o id que foi passado por query params
    const id = req.params.id;
    //filtro meu array de objetos para encontrar o objetivo requerido
    const funcionarioASerModificado = funcionarios.find((funcionario) => funcionario.id == id);
    console.log(funcionarioASerModificado);
    // Pega o corpo da requisição com as alterações
    const funcionarioAtualizado = req.body;
    console.log(funcionarioAtualizado);

    // Index
    const index = funcionarios.indexOf(funcionarioASerModificado);
    console.log(index);
    //Para o splice: 1. Busca no array(endereço), 2. Excluindo(Quantidade de elementos) ; 3. Substituindo pelo novo
    // Buscando no array o endereço, excluindo o registro antigo e substituindo pelo novo
    funcionarios.splice(index, 1, funcionarioAtualizado);
    console.log(funcionarios);

    fs.writeFile(
      "./src/model/funcionarios.json",
      JSON.stringify(funcionarios),
      "utf8",
      function (err) {
        if (err) {
          return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
      }
    );

    res.status(200).send(funcionarios);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

const patchFuncionario = (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;
  console.log(atualizacao);

  try {
    const funcionarioASerModificado = funcionarios.find((funcionario) => funcionario.id == id);
    console.log(Object.keys(funcionarioASerModificado));

    //Ele vai buscar dentro do objeto "livroASerModificado" atributos em que o nome coincida com os do objeto "atualizacao", e vai substituir o valor.

    Object.keys(atualizacao).forEach((chave) => {
      funcionarioASerModificado[chave] = atualizacao[chave];
    });

    fs.writeFile(
      "./src/model/funcionarios.json", JSON.stringify(funcionarios), "utf8", function (err) {
        if (err) {
          return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
      }
    );

    return res.status(200).send(funcionarios);

  } catch (err) {
    return res.status(424).send({ message: err });
  }
};
//termina aqui
module.exports = {
  getFuncionarios,
  postFuncionario,
  deleteFuncionario,
  getFuncionarioById,
  putFuncionario,
  patchFuncionario
};
