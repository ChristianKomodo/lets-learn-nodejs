var express = require('express');
var router = express.Router();
var Request = require('request');

// obdbapi API Key
const apiKey = process.env.OMDB_API_KEY;

// Search Route with Search Term Query Parameter
router.get('/search/:searchId', function(req, res) {
	// res.send(req.params.searchId);

	const searchId = req.params.searchId;
	// const formattedSearchId = searchId.replace(' ', '+');  // Convert spaces to plus signs
	const formattedSearchId = searchId.replace(/\+/g, ' ');  // Convert plus signs to spaces

	Request.get(
		`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchId}&plot=full&page=1`,
		(error, response, body) => {
			if (error) {
				return console.dir('error is', error);
			} else {
				const bodyJSON = JSON.parse(body);
				res.send(bodyJSON.Search);
			}
		}
	);
});

module.exports = router;
