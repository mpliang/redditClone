"use strict";
let mongoose = require('mongoose');

let SubredditSchema = new mongoose.Schema({
  title: {type: String, required: true},
  posts: [{type: mongoose.Schema.ObjectId, ref: "Post"}],
  subscribers: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  about: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Subreddit', SubredditSchema );
