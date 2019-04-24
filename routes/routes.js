var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function (app) {

    app.get('/scrape', function (req, res) {
        var results = [];

        axios.get('https://politics.theonion.com/').then(function (response) {

            var $ = cheerio.load(response.data);

            $('article.postlist__item').each(function (i, element) {

                var article = {};

                article.title = $(this).find('h1.headline').text().trim();
                article.link = $(this).find('a.js_entry-link').attr('href');
                article.summary = $(this).find('p').text().trim();

                results.push(article);

                //push scraped article to mongoDB (works) 
                db.Article.create(article);
            });

        }).catch(function (err) {
            res.json(err);
        });

    });

    app.get('/clearall', function (req, res) {
        db.Article.deleteMany({ saved: false }).then(function(data){});
    });

    app.get('/save/:id', function (req, res) {

        // db.schools.update({_id:doc._id}, {$set:{scores:zz}}, function(err, result) {
        //     if (err)
        //         //do something.
        // });
        db.Article.updateOne({ _id: req.params.id }, { saved: true }).then(function (response) {
            res.status(201).end();
        }).catch(function (err) {
            console.log(err);
            res.json(err);
        });
    });

    app.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({}).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // app.get("/articles/:id", function (req, res) {
    //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //     db.Article.findOne({ _id: req.params.id }).populate("note").then(function (dbArticle) {
    //         res.json(dbArticle);
    //     }).catch(function (err) {
    //         res.json(err);
    //     });
    // });

    // app.post("/articles/:id", function (req, res) {
    //     // Create a new note and pass the req.body to the entry
    //     db.Note.create(req.body).then(function (dbNote) {
    //         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    //     }).then(function (dbArticle) {
    //         res.json(dbArticle);
    //     }).catch(function (err) {
    //         res.json(err);
    //     });
    // });

    //NO CODE BELOW THIS LINE    
};
