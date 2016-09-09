var express = require("express");
var bodyParser = require("body-parser");
var expresHandlebars = require("express-handlebars");
var path = require("path");
var app = express();
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