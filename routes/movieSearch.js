var express = require('express');
var router = express.Router();
var Request = require('request');

// obdbapi API Key
const apiKey = process.env.OMDB_API_KEY;

router.get('/', function(req, res) {
	res.render('movieSearch', { title: 'Movie Search' });
});

router.post('/search', function(req, res) {
	const searchTitle = req.body.title;
	const searchType = req.body.type;

	Request.get(
		`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTitle}&plot=full&page=1`,
		(error, response, body) => {
			if (error) {
				return console.dir('error is', error);
			} else {
				const bodyJSON = JSON.parse(body);
				res.status(200).send(bodyJSON);
			}
		}
	);
});

module.exports = router;
