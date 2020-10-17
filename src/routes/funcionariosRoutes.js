const express = require('express');
const router = express.Router();
const controller = require('../controller/funcionariosController');

router.get('/', controller.getFuncionarios);
router.get('/:id', controller.getFuncionarioById);
router.post('/:id', controller.postFuncionario);
router.delete('/:id', controller.deleteFuncionario);
router.put('/:id', controller.putFuncionario);
router.patch('/:id', controller.patchFuncionario); 
  

module.exports = router;