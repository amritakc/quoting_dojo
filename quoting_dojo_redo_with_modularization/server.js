// Require the Express Module
var express = require("express");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/basic_quote');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Setting our Static Folder Directory

app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
var QuoteSchema = new mongoose.Schema({
 name: String,
 quo: String
})
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote')
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/quotes', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var quote = new Quote({name: req.body.name, quo: req.body.quo});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  quote.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a quote!');
      res.redirect('/quotes');
    }
  })
})

app.get('/quotes', function(req, res) {
    Quote.find({},function(err,quotes){
      console.log("inside all_quotes function")
      console.log(quotes)
      res.render('quotes', {all_quotes:quotes});
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
    
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})