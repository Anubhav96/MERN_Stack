const expres = require('express');
const router = expres.Router();

/* 
@route      GET api/posts
@desc       Test Route
@access     Public
*/
router.get('/', (req, res) => res.send('Posts Route'));

module.exports = router;
