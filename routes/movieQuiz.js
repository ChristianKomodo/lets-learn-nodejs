var express = require('express');
var router = express.Router();
var requestPromise = require('request-promise-native');
const apiKey = process.env.OMDB_API_KEY;

router.get('/', function (req, res, next) {
	res.render('movieQuiz', {
		title: 'How About We Play a Movie Quiz Game?',
		plot: 'Luke Skywalker is in a galaxy far, far away.'
	});
});

// Get movie title and plot for as many IDs are in the query params
router.get('/get-movies/:ids', async (req, res) => {

	// example URL
	// http://localhost:3000/movie-quiz/get-movies/tt0437086|tt0111161|tt0109506

	const allIDs = req.params.ids.split('|');
	const allCalls = [];
	const allMovies = [];

	const makeCall = (id) => {
		return requestPromise({
			uri: `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=short`,
			json: true
		})
	}

	allIDs.map((id) => allCalls.push(makeCall(id)));

	Promise.all(allCalls)
		.then(movies => {
			movies.forEach(movie => {
				allMovies.push({
					name: movie.Title,
					plot: movie.Plot
				});
			});
			res.send(allMovies);
		});

});


// Get a title and plot of a single movie
router.get('/get-movie/:id', function (req, res) {

	// tt0437086 is Battle Angel
	// Example URL is http://localhost:3000/movie-quiz/get-movie/tt0437086

	var movieRequest = {
		uri: `http://www.omdbapi.com/?apikey=${apiKey}&i=${req.params.id}&plot=full`,
		json: true
	};

	requestPromise(movieRequest)
		.then(function (movie) {
			res.send({
				name: movie.Title,
				plot: movie.Plot
			});
		})
		.catch(function (err) {
			res.send('error:', err.message, err.stack);
		});

});

router.get('/scrape', function (req, res) {

	var cheerio = require('cheerio'); // Basically jQuery for NodeJS

	var options = {
		uri: 'https://letterboxd.com/top10ner/list/top10ners-1001-greatest-movies-of-all-time/page/1/',
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	requestPromise(options)
		.then(function ($) {
			const titles = [];
			// Select all images, and then loop and collect all the alt attributes
			$('img').each(function (i) {
				titles[i] = $(this).attr('alt');
			});
			// Send the array of all the movie titles
			res.send(titles);
		})
		.catch(function (err) {
			res.send('error:', err.message, err.stack);
		});

});


module.exports = router;