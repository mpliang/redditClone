"use strict";
let mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
  title: {type: String, required: true},
  posts: [{type: mongoose.Schema.ObjectId, ref: "Post"}],
  subscribers: {type: Number, default: 0},
  about: {type: String, required: true}
});

module.exports = mongoose.model('Category', CategorySchema );
