const express = require("express");
const router = express.Router();
const{create, index, show, update, destroy} = require('../controllers/tags.js');
const validator = require('../middlewares/validator.js')
const bodyData = require('../validations/tags.js')

router.post('/',validator(bodyData), create)

router.get('/', index)

router.get('/:slug', show)

router.put('/:slug',validator(bodyData), update)

router.delete('/:slug', destroy)

module.exports = router; 