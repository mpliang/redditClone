"use strict";
let mongoose = require('mongoose');

let SubredditSchema = new mongoose.Schema({
  title: {type: String, required: true},
  recentPosts: [{type: mongoose.Schema.ObjectId, ref: "Post"}],
  subscribers: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  about: {type: String, required: true},
  icUrl: {type: String, default: "http://placehold.it/300x600?text=Pic"},
  createdBy: {type: mongoose.Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Subreddit', SubredditSchema );
