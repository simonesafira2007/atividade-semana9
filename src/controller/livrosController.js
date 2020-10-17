const livros = require("../model/livros.json");
const fs = require("fs");
const { resourceUsage } = require("process");

const getLivros = (req, res) => {
  console.log(req.url);
  res.status(200).send(livros);
};

const postLivro = (req, res) => {
  console.log(req.body);
  const { id, dataPublicacao, tema, titulo, paginas, autor } = req.body;
  livros.push({ id, dataPublicacao, tema, titulo, paginas, autor });

  fs.writeFile(
    "./src/model/livros.json",
    JSON.stringify(livros),
    "utf-8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo adicionado e atualizado com sucesso!!");
    }
  );

  res.status(201).send(livros);
};

const deleteLivro = (req, res) => {
  const id = req.params.id;
  const livroFiltrado = livros.find((livro) => livro.id == id);
  const index = livros.indexOf(livroFiltrado);
  livros.splice(index, 1);

  fs.writeFile(
    "./src/model/livros.json",
    JSON.stringify(livros),
    "utf8",
    function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }

      console.log("Arquivo deletado e atualizado com sucesso");
    }
  );

  res.status(200).send(livros);
};

//Método PUT

const putLivro = (req, res) => {
  try {
    // pego o id que foi passado por query params
    const id = req.params.id;
    //filtro meu array de objetos para encontrar o objetivo requerido
    const livroASerModificado = livros.find((livro) => livro.id == id);
    console.log(livroASerModificado);
    // Pega o corpo da requisição com as alterações
    const livroAtualizado = req.body;
    console.log(livroAtualizado);

    // Index
    const index = livros.indexOf(livroASerModificado);
    console.log(index);
    //Para o splice: 1. Busca no array(endereço), 2. Excluindo(Quantidade de elementos) ; 3. Substituindo pelo novo
    // Buscando no array o endereço, excluindo o registro antigo e substituindo pelo novo
    livros.splice(index, 1, livroAtualizado);
    console.log(livros);

    fs.writeFile(
      "./src/model/livros.json",
      JSON.stringify(livros),
      "utf8",
      function (err) {
        if (err) {
          return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
      }
    );

    res.status(200).send(livros);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

const patchLivro = (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;
  console.log(atualizacao);

  try {
    const livroASerModificado = livros.find((livro) => livro.id == id);
    console.log(Object.keys(livroASerModificado));

    //Ele vai buscar dentro do objeto "livroASerModificado" atributos em que o nome coincida com os do objeto "atualizacao", e vai substituir o valor.

    Object.keys(atualizacao).forEach((chave) => {
      livroASerModificado[chave] = atualizacao[chave];
    });

    fs.writeFile(
      "./src/model/livros.json", JSON.stringify(livros), "utf8", function (err) {
        if (err) {
          return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
      }
    );
    
    return res.status(200).send(livros);

  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

module.exports = {
  getLivros,
  postLivro,
  deleteLivro,
  putLivro,
  patchLivro,
};
