//dependencies
var express = require('express');

var logger = require('morgan');
var mongoose = require('mongoose');

//setup express
var app = express();
var PORT = process.env.PORT || 8080;

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//set up middleware
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static directory
app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/OnionArticles";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//routes
require('./routes/html_routes.js')(app);
require('./routes/routes.js')(app);

//set server to listen
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});