var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function(app) {
    
    app.get('/scrape', function(req, res) {
        var results = [];
        axios.get('https://politics.theonion.com/').then(function(response) {
            var $ = cheerio.load(response.data);
            $('h1.headline').each(function(i, element) {
                var article = {};
                article.title = $(this).children().text();
                article.link = $(this).children().attr('href');
                results.push(article);
            });
            res.json(results);
        }); 
    });

    app.get('/save', function(req, res) {
        db.Article.create(result).then(function(dbArticle) {
            console.log(dbArticle);
        }).catch(function(error) {
            return res.json(error);
        });
    });

    app.get("/articles", function(req, res) {
        // Grab every document in the Articles collection
        db.Article.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id }).populate("note").then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body).then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });
 //NO CODE BELOW THIS LINE    
};
