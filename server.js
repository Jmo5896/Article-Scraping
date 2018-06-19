//dependencies
var express = require('express');
var bodyParser = require('body-parser');

//setup express
var app = express();
var PORT = process.env.PORT || 8080;

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static directory
app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//routes

//set server to listen
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});