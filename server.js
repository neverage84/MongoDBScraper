var exphbs = require("express-handlebars");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/MongoScraper", { useNewUrlParser: true });



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controller/scrape_controller.js");

app.use(routes);



// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://dnd.wizards.com/articles/unearthed-arcana").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("h4").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.summary = $(this)
        .nextAll('.summary')
        .children("p")
        .text();
        result.link = "https://dnd.wizards.com/" + 
           $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        // console.log(result); 
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
            
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      
      res.render("index");
      // Send a message to the client
    //   res.send("Scrape Complete");
    });
  });

// Route for getting all Articles from the db
app.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}, "title summary link")
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        // var article = [];
        // article.push(dbArticle);
        console.log(dbArticle);
        const articles = dbArticle.map(function(article){
            return {_id:article._id, title:article.title, summary: article.summary, link: article.link}
        });
        console.log(articles);
        res.render("index", { article : articles});
        // console.log(article);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for getting all Articles from the db
app.get("/Clear", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.deleteMany({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      // res.json(dbArticle);
      // var article = [];
      // article.push(dbArticle);
      
      res.render("index");
      // console.log(article);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
    });

// Route for saving a new Note to the db and associating it with a User
app.post("/submit/:id", function(req, res) {
    // Create a new Note in the db
    
    db.Note.create(req.body)
      .then(function(dbNote) {
       
      
    //     // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
    //     // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      
      })
      .then(function(dbArticle) {
    //     // If the User was updated successfully, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
    //     // If an error occurs, send it back to the client
        res.json(err);
      });
  });

//   app.get("/articles/:id"), function(req,res){
//       db.Article.find({})
      
//       .then(function(dbArticle){
//           console.log(dbArticle);
//       })
//       .catch(function(err){
//           console.log(err);
//       })
//   }




        // console.log(article);

//         app.get("/SavePage", function(req, res) {
//         //     db.Saved.find({}, "title summary link")
//         //         .then(function(dbArticle) {
//         // // If we were able to successfully find Articles, send them back to the client
//         // // res.json(dbArticle);
//         // // var article = [];
//         // // article.push(dbArticle);
//         //         console.log(dbArticle);
//         //         const savedarticles = Saved.map(function(saved){
//         //     return {_id:saved._id, title:saved.title, summary: saved.summary, link: saved.link}
//         // });
//         // console.log(savedarticles);
//         res.render("saved");
//         // console.log(article);
//     //   })
//     //   .catch(function(err) {
//     //     // If an error occurred, send it to the client
//     //     res.json(err);
//     //   });
// });

    //      app.get("/saveArticle/:id", function(req, res) {
    //             // First, we grab the body of the html with axios
    //      // Then, we load that into cheerio and save it to $ for a shorthand selector
    //      db.Article.findOne({ _id: req.params.id}, "title summary link")
    //      .then(function(dbArticle) {
    //        // If we were able to successfully find Articles, send them back to the client
          
           
           
    //        var result = {};
  
    //     // Add the text and href of every link, and save them as properties of the result object
    //     result.title = dbArticle.title;
    //     result.summary = dbArticle.summary;
    //     result.link = dbArticle.link;

    //         db.Saved.create(result)
    //         .then(function(dbArticle) {
    //           // View the added result in the console
    //           console.log(dbArticle);
              
    //         })
    //         .catch(function(err) {
    //           // If an error occurred, log it
    //           console.log(err);
    //         });
    //     });
    // });

app.get("/articles/:id", function(req,res) {
    console.log("GOT");
    db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

                  
                  
               
           






// Start the server
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
