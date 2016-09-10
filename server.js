var express = require("express");
var bodyParser = require("body-parser");
var expresHandlebars = require("express-handlebars");
var path = require("path");
var app = express();
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html
var mongojs = require('mongojs');
var databaseUrl = "facts";
var collections = ["fact"];
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.engine("handlebars", expresHandlebars({
    defaultLayout: "index.html"
}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname)));
// Routes

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT);
});

// console.log("\n***********************************\n" +
//             "Grabbing every fun fact\n" +
//             "from a website:" +
//             "\n***********************************\n");

// request('http://www.thefactsite.com/2011/07/top-100-random-funny-facts.html', function (error, response, html) {


// var $ = cheerio.load(html);

// var result = [];

// $('ol').each(function(i, element){

// 	var title = $(this).text();

// 	var link = $(element).children();

// 	result.push({
//         title:title,
//         link:link
//       });
//     });

// console.log(result);
// });

var db = mongojs(databaseUrl, collections);

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
