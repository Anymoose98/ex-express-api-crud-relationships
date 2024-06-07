const express = require("express");
const router = express.Router();
const{create, index, show, update, destroy} = require('../controllers/posts.js');

router.post('/', create)

router.get('/', index)

router.get('/:slug', show)

router.get('/:slug', update)

router.delete('/:slug', destroy)




module.exports = router; 