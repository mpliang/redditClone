"use strict"

let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  upvotes: {type: Number, default: 0},
  downvotes: {type: String, default: 0},
  content: {type: String, required: true},
  comments: [{type: mongoose.Schema.ObjecId, ref: "Comment"}],
  dateCreated: {type: Date, default: new Date()}
});


module.exports = mongoose.model('Comment', CommentSchema )
