"use strict"

let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  score: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.ObjectId, ref: "Comments"}],
  contentURL: {type: String, required: true},
  dateCreated: {type: Date, default: new Date()},
  subreddit:  {type: mongoose.Schema.ObjectId, ref: 'Subreddit'},
  upvotingUsers: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  downvotingUsers: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  contentType: {type: String, enum: ["video", "image", "text", "article"], required: true}
});

module.exports = mongoose.model('Post', PostSchema);
