const expres = require('express');
const router = expres.Router();
const usersController = require('../../controllers/users');
const usersValidation = require('../../validation/users');
/* 
@route      POST api/users
@desc       Register user
@access     Public
*/
router.post(
    '/',
    usersValidation.validate('registerUser'),
    usersController.registerUser
);

module.exports = router;
