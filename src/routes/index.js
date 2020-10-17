const express = require('express');
const router = express.Router();

router.get('/', function (req,res) {
    res.status(200).send({
      "Title": "Sistema de Inclusao e exclusao de livros e funcionarios "
    
    })
   
});     

module.exports = router;
   