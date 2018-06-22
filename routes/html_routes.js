var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/savedArticles", function(req, res) {
        res.render("saved");
    });
 //NO CODE BELOW THIS LINE    
};

