var Mongoose = require('mongoose');

var subreddit = Mongoose.Schema({
  name: {type: String, required: true, unique: true},
  picUrl: {type: String, default: "http://placehold.it/300x600?text=Pic"},
  posts: [],
});

var Subreddit = Mongoose.model('Subreddit', subreddit);
module.exports = Subreddit;
