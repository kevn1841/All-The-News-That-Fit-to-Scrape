var express = require("express");
var bodyParser = require("body-parser");
var expresHandlebars = require("express-handlebars");
var path = require("path");
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var databaseUrl = "facts";
var collections = ["fact"];
var mongoose = require('mongoose')
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

// app.engine("handlebars", expresHandlebars({
//     defaultLayout: "index.html"
// }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname)));


app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT);
});


// var db = mongojs(databaseUrl, collections);
mongoose.connect('mongodb://heroku_3vtpsb7d:bvqpq9i4am15hropj5iaiu6q8p@ds019926.mlab.com:19926/heroku_3vtpsb7d')

var db = mongoose.connect;

db.on('error', function(err) {
  console.log('Database Error:', err);
});

app.get('/scrape', function(req, res) {
	
	request('https://www.reddit.com/r/funfacts/', function(error, response, html) {

		var $ = cheerio.load(html);

		$('a.title').each(function(i, element){

			var title = $(this).text();

			if (title) {

				db.fact.save({
          			title: title
          		},

          		function(err, saved) {
		          // if there's an error during this query
		          if (err) {
		            // log the error
		            console.log(err);
		          } 
		          // otherwise, 
		          else {
		            // log the saved data
		            console.log(saved);
		          }
		        });
		      }
		    });
		  });

	// this will send a "search complete" message to the browser
  res.send("Scrape Complete");
});

// console.log(module.exports)


app.get('/new', function(req, res) {
  res.send("Hello world");
});

app.get('/', function(req, res) {

	res.redirect(index.html)
  // Query: In our database, go to the animals collection, then "find" everything 
  db.fact.find({}, function(err, found) {
    // log any errors if the server encounters one
    if (err) {
      console.log(err);
    } 
    // otherwise, send the result of this query to the browser
    else {
      res.send(found);
    }
  });
});