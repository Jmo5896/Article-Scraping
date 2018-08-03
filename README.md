# Article-Scraping:
*   I built this Project to test my ability to write an article scraping app and to practice using the 
MongoDB platform. It is, overall, a very simple app.  It scrapes the onion's main website for articles 
and populates the page with 20 articles from the site.  You can save articles and once saved they will 
not appear on the next scrape.

# Getting Started:
* TO get started you can clone this repo (see link below for help) or visit the working site on heroku:
[Working Site](https://onion-scraper-5896.herokuapp.com/)
[https://services.github.com/on-demand/github-cli/clone-repo-cli](https://services.github.com/on-demand/github-cli/clone-repo-cli)

# Prerequisites:
* If you have decide to try and run this locally, after cloning the repo to your machine you will want 
to fire up your Mongo shell in bash and get your data base manager up and running (I use Robo 3T).  
For help setting these up check out the links below:
[MongoDB](https://docs.mongodb.com/manual/mongo/) && [Robo 3T](https://robomongo.org/)

* Once your MongoDB is all sorted you'll want to run "npm i" in your bash to install the following npm 
packages: axios, body-parser, cheerio, express, express-handlebars, mongoose, morgan, and request.

# Walkthrough:
* When you fire up the site for the first time it'll navigate you to a page with two buttons: Saved Articles 
and Scrape Onion. The "Saved Articles" button will navigate you to the "Saved Articles" page, which will 
diplay all saved articles.
[Saved Articles Button](./gifs/saved-articles.gif)

* The "Scrape Onion" button will pick the first 20 articles from the onion's website and will diplay a title/link, a summary (if there is one), and a save button.
[Scrape Onion Button](./gifs/scrape-onion.gif)

* When you click the title/link it will navigate you to the entire article.
[Title Demo](./gifs/link.gif)

* When you click save a notification will appear and the article will then be saved to the database.
[Save Demo Pt 1](./gifs/save01.gif) 
[Save Demo Pt 2](./gifs/save02.gif)

# Built With
* Node.js
* MongoDB
* Express
* Handlebars
* jQuery
* Javascript
* CSS
* HTML

# Authors
* Justin Moore