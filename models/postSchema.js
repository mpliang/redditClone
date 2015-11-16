"use strict"

let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  score: {type: Number, default: 0},
  body: {type: String},
  comments: [{type: mongoose.Schema.ObjectId, ref: "Comments"}],
  contentURL: {type: String, default: "http://placehold.it/200x200"},
  dateCreated: {type: Date, default: new Date()},
  subreddit: String
  // subreddit:  {type: mongoose.Schema.ObjectId, ref: 'Subreddit'},
  // votingUsers: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  // contentType: {type: String, enum: ["video", "image", "text", "article"], required: true}
});

module.exports = mongoose.model('Post', PostSchema);
