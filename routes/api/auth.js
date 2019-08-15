const expres = require('express');
const router = expres.Router();
const auth = require('../../middleware/auth');
const authController = require('../../controllers/auth');
const authValidation = require('../../validation/auth');

/* 
@route      GET api/auth
@desc       Get user by id
@access     Public
*/
router.get('/', auth, authController.getUserById);

/* 
@route      POST api/auth
@desc       Authenticate user & get token
@access     Public
*/
router.post(
    '/',
    authValidation.validate('authenticate'),
    authController.authenticate
);

module.exports = router;
