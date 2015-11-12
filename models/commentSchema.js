"use strict";

let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  score: {type: Number, default: 0},
  parentType: {type: String, enum: ["comment", "post"], required: true},
  parent: {
    comment: {type: mongoose.Schema.ObjectId, ref: "Comment"},
    post: {type: mongoose.Schema.ObjectId, ref: "Post"}
  },
  parentPost: {type: mongoose.Schema.ObjectId, ref: "Post"},
  content: {type: String, required: true},
  comments: [{type: mongoose.Schema.ObjectId, ref: "Comment"}],
  dateCreated: {type: Date, default: new Date()}
});


module.exports = mongoose.model('Comment', CommentSchema );
