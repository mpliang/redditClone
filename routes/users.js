"use strict"

var express = require('express');
var router = express.Router();
var User = require('../models/userSchema.js');
var Auth = require('../config/auth.js');
let atob = require('atob')
let CONSTANTS = require('../config/constants')
let apiKey = CONSTANTS.MAILGUN_API_KEY
let domain = CONSTANTS.MAILGUN_DOMAIN
let mailgun = require('mailgun-js')({apiKey, domain})

let sendRegistration = (newUser) =>{
  let email = "Welcoming Committee <noreply@redditClone.clone>"
  let name = newUser.fullName || newUser.username;
  let randomNumber = Math.floor(Math.random() * 200000);
  let data = {
    from: email,
    to: newUser.email,
    subject: "Thank you for signing up!",
    text: `Hi ${name},\n Welcome to RedditClone no. ${randomNumber}. We hope you enjoy our site and find some pretty neat stuff.`
  };
  mailgun.messages().send(data, function(err, body){
    err ? console.log(err) : console.log("welcome message sent", body);
  });
}

router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).send('Username and password are required fields');
  }

  var user = new User();
  user.username= req.body.username;
  user.fullName= req.body.fullName;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, savedUser){
    if(err){
      res.status(499).send(err)
    } else {
      var jwt = user.generateJWT();
      if (apiKey) sendRegistration(savedUser); // if statement only for development purposes.
      res.send(jwt);
    }
  })
});

router.post('/login', function(req, res, next){
  User.findOne({username: req.body.username}, function(err, user){
    if(err){
      res.status(499).send(err);
    }else if(!user || !user.validPassword(req.body.password)){
      res.status(499).send('Invalid login credentials');
    }else{
      var jwt = user.generateJWT();
      res.send(jwt);
    }
  })
});

router.get('/me/', Auth, (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "")
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id

  User.findById(userID).populate('favoriteSubreddits').exec(function (err, data){
    err ? res.status(499).send(err) : res.send(data)
  })
});

router.get('/user/:id', Auth, (req, res) => {
  User.findById(req.params.id, (err, user)=> {
    if (err) res.status(499).send(err);
    else res.send(user)
  })
});

module.exports = router;
