# Let's Learn Some NodeJS and ExpressJS!
This project is a few practice mini-applications using NodeJS, ExpressJS and "vanilla" Javascript.

So far I made pages that can do things like
- Use `Request()` to return data from an API and update the view with the data
- Search the OMDB Movie Database API
- Use Ajax to submit a form to a Node endpoint
- Display data with EJS templating

And I'm currently building a Movie Quiz game that uses promises and `async/await` to execute several asynchronous API calls at once - one call for each OMDB movie ID passed to the route.

I also added a References page with links to some of the libraries and tutorial sites that helped me along the way.

## Installation
- Git clone it
- `npm install`
- Get an API Key from OMDB and add it to `.env` (info below) if you want to use the Movie Search and Movie Quiz pages
- `npm start`
- `http://localhost:3000/`

### OMDB API Key
To use the movie search functionality in these projects, you need to add to this project an API Key from the [OMDb API](http://www.omdbapi.com/) website.  Create an empty file named `.env` in the root of this project after you clone it.  Put the following into that file:
```OMDB_API_KEY=123yourkeyhere123```
...but of course substitute your own API Key after the `OMDB_API_KEY=`.

## Some Fun URLs in These Projects
There is navigation at the top of all the pages to go to the various mini-projects or the references page, but here are some additional links and endpoints you might enjoy:

### API to Return Movie Plots
Navigate to http://localhost:3000/movie-quiz/get-movies/tt0437086|tt0111161|tt0109506

You can see that in the above URL are several IMDB movie IDs separated by pipes (the | character).  String a few in there separated by pipes and it will return plots for all those movies.  You can find IMDB movie IDs in the address bar when viewing a movie on IMDB, for instance you can see the ID `tt0437086` when viewing the page about the movie [Alita, Battle Angel](https://www.imdb.com/title/tt0437086/).  The above URL will return an array of abbreviated plots for *Alita: Battle Angel*, *Shawshank Redeption* and *The Crow* respectively.  Those plots are used in the Movie Quiz game and the plots are abbreviated because the full plots commonly include giveaway clues or even the movie title itself.

### Web Scraper
Navigate to http://localhost:3000/movie-quiz/scrape to see the web scraper in action.

I used the [Cheerio](https://www.npmjs.com/package/cheerio) library to parse HTML from a website that lists the [1001 Greatest Movies of All Time](https://letterboxd.com/top10ner/list/top10ners-1001-greatest-movies-of-all-time) according to IMDB and other sources, so I could get a big array of movie titles for the Movie Quiz game.  It uses the [Accessible Autocomplete](https://alphagov.github.io/accessible-autocomplete/examples/) library to allow the player to use autocomplete functionality to ensure that they spell their answer correctly in the game and not lose because they misspelled "Jurassic Park".  Currently the above URL returns the first 100 movie titles in a raw array format, and is also used as the endpoint that the Movie Quiz game uses to populate it's list for the autocomplete.

I'm using the [Request Promise Native](https://www.npmjs.com/package/request-promise-native) library to use native promises to run several API calls at a time and return them with `Promise.all()`.