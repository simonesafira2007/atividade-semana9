// passo a passo
// inicializar o servidor
// definir porta
// importar arquivo de source (app.js)
// criar const para atribuir porta
// chamar o método listen
    
const app = require ('./src/app');
const port = 8080

app.listen(port, () => {
    console.log(`Executando em http://localhost:${port}`);
     
})

// notação template string ${}