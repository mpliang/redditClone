"use strict"

let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  score: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.ObjectId, ref: "Comments"}],
  contentURL: {type: String, required: true},
  dateCreated: {type: Date, default: new Date()},
  contentType: {type: String, required: true}
});

module.exports = mongoose.model('Post', PostSchema);
