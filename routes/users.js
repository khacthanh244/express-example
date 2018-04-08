var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController');

router.get('/create', user.createUser);
router.get('/', user.getUser);
router.get('/findElasticSearch', user.findElasticSearch);

module.exports = router;
