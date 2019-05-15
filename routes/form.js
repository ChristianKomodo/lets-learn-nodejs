var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('form', { title: 'Form Submission', response: '' });
});

router.post('/submitted', function(req, res, next) {

	const username = req.body.username;

	res.render('form', { title: 'Form Response', response: username });
});

module.exports = router;
