var Mongoose = require('mongoose');

var post = Mongoose.Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  link: String,
  Body: String
});

var Institution = Mongoose.model('Post', post);
module.exports = Post;
