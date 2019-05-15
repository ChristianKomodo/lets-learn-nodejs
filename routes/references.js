var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('references', { title: 'References' });
});

module.exports = router;
