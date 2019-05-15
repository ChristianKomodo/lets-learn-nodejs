var express = require('express');
var router = express.Router();
var Request = require('request');

router.get('/', function(req, res, next) {
	Request.get('https://randomuser.me/api/', (error, response, data) => {
		if (error) {
			return console.dir(error);
		}
		data = JSON.parse(data);

		user = data.results[0];

		// // Just see the data
		// res.send(user);

		console.dir(user);

		function capitalCase(str) {
			str = str.split(' ');

			for (var i = 0, x = str.length; i < x; i++) {
				str[i] = str[i][0].toUpperCase() + str[i].substr(1);
			}

			return str.join(' ');
		}

		user.name.title = capitalCase(user.name.title);
		user.name.first = capitalCase(user.name.first);
		user.name.last = capitalCase(user.name.last);

		res.render('user', {
			title: 'Random User Generator',
			user: user
		});
	});
});

module.exports = router;
