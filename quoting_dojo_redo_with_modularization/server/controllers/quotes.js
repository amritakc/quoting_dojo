var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports = {
  show: function(req, res) {
    Quote.find({}, function(err, quotes) {
      res.render('quotes', {all_quotes:quotes});
    })
  },
  create: function(req, res) {
    var quote = new Quote({name: req.body.name, quo: req.body.quo});
    quote.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        res.redirect('/quotes');
      }
    })
  }
}