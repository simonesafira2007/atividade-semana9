const livros = require('../model/livros.json');
const fs = require('fs');

const getLivros = (req, res) => {
    console.log(req.url);
    res.status(200).send(livros)
};
         

const postLivro = (req, res) => {
    console.log(req.body);
    const {id, dataPublicacao , tema , titulo, paginas, autor} = req.body;
    livros.push({id, dataPublicacao , tema , titulo, paginas, autor});

    fs.writeFile('./src/model/livros.json', JSON.stringify(livros), 'utf-8', function(err){
        if(err){
            return res.status(424).send({message:err});   
        }
        console.log('Arquivo adicionado e atualizado com sucesso!!');

    });

    res.status(201).send(livros);
}

const deleteLivro = (req, res) => {
    const id = req.params.id;
    const livroFiltrado = livros.find((livro) => livro.id ==id);
    const index = livros.indexOf(livroFiltrado);
    livros.splice(index, 1);

    fs.writeFile("./src/model/livros.json", JSON.stringify(livros), "utf8", function(err) {
        if (err) {
          return res.status(424).send({ message: err});
}
    
console.log('Arquivo deletado e atualizado com sucesso');
});

res.status(200).send(livros);

}

 
module.exports = {
    getLivros, 
    postLivro,
    deleteLivro
};