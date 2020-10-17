const { Router } = require("express");
const express = require('express');
const router = express.Router();
const controller = require('../controller/livrosController');


router.get('/', controller.getLivros);
router.post('/', controller.postLivro);
router.delete('/:id', controller.deleteLivro);
router.put("/:id", controller.putLivro);
router.patch("/:id", controller.patchLivro);

    
module.exports = router;