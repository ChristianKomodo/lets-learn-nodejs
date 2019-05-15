var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('ajax', { title: 'Form Data with Ajax' });
});

router.post('/ajax-received', function(req, res) {
	res.status(200).send(JSON.stringify({ status: '200 OK, mon', pageData: `Response from the route contains ${req.body.param1} and  ${req.body.param2}.` }));
});

module.exports = router;
