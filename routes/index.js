var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'How About We Learn NodeJS?' });
});

module.exports = router;
