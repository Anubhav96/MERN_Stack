const expres = require('express');
const router = expres.Router();

/* 
@route      GET api/users
@desc       Test Route
@access     Public
*/
router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
