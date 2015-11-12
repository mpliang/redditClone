"use strict"

let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  upvotes: {type: Number, default: 0},
  downvotes: {type: String, default: 0},
  comments: [{type: mongoose.Schema.ObjecId, ref: "comments"}],
  contentURL: {type: String, required: true},
  dateCreated: {type: Date, default: new Date()}
});


module.exports = mongoose.model('Post', PostSchema)
