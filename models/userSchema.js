"use strict"
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
var crypto = require('crypto');
var constants = require('../config/constants.js');

var UserSchema = new mongoose.Schema({
  username: {type: String,  unique: true, required: true},
  fullName: String,
  email: {type: String, unique: true, required: true},
  hash: String,
  salt: String,
  points: {type: Number, default: 0},
  dateJoined: {type: Date, default: new Date()},
  authoredPosts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}],
  favoritesPosts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}],
  favoriteCategories: [{type: mongoose.Schema.ObjectId, ref: 'Category'}]
})


UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, constants.SECRET);
};

module.exports = mongoose.model('User', UserSchema)