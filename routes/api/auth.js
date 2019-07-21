const expres = require('express');
const router = expres.Router();

/* 
@route      GET api/auth
@desc       Test Route
@access     Public
*/
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
