var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        db.Article.find({}).then(function(dbData) {
            res.render("index", { articles: dbData});
        })
        
    });

    app.get("/savedArticles", function(req, res) {
        db.Article.find({}).then(function(dbData) {
            res.render("saved", { articles: dbData});
        })
    });
 //NO CODE BELOW THIS LINE    
};

