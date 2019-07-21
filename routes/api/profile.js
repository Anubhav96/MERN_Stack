const expres = require('express');
const router = expres.Router();

/* 
@route      GET api/profile
@desc       Test Route
@access     Public
*/
router.get('/', (req, res) => res.send('Profile Route'));

module.exports = router;
