var express = require('express');
var router = express.Router();
var Request = require('request');

router.get('/', function(req, res, next) {
	Request.get('https://yesno.wtf/api', (error, response, body) => {
		if (error) {
			return console.dir('error is', error);
		} else {
			const bodyJSON = JSON.parse(body);
			const color = bodyJSON.answer === 'yes' ? 'green' : 'red';
			res.render('yesno', {
				title: 'Random Yes/No Generator',
				answer: bodyJSON.answer,
				image: bodyJSON.image,
				color: color
			});
		}
	});
});

module.exports = router;
