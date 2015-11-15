"use strict"

let express = require('express');
let router = express.Router();
let User = require('../models/userSchema.js');
let Auth = require('../config/auth.js');
let parseJWT = require('../config/parseJWT')
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

  let user = new User();
  user.username= req.body.username;
  user.fullName= req.body.fullName;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, savedUser){
    if(err){
      res.status(499).send(err);
    } else {
      let jwt = user.generateJWT();
      if (CONSTANTS.MAILGUN_API_KEY) sendRegistration(savedUser); // if statement only for development purposes.
      res.send(jwt);
    }
  })
});

let subscriptionService = (userId, subredditId, isSubscribe)=>{
  let error = null;
  let status = 200;
  let data = {};
  Subreddit.findById(subredditId, (err, subreddit) => {
    if(err) {
      error = err;
      status = 499;
    }
    let index1 = subreddit.subscribers.indexOf(userId)
    if(isSubscribe && index1 === -1 || !isSubscribe && index1 !== -1){
      isSubscribe ? subreddit.subscribers.push(userId) : subreddit.splice(index1, 1);
      subreddit.save(err =>{
        if(err) {
          error = err;
          status = 499;
        }
        data.subreddit = subreddit;
      })
      User.findById(userId, (err, user)=>{
        if (err) error = err;
        let index2 = user.favoriteSubreddits.indexOf(subredditId)
        isSubscribe ?  user.favoriteSubreddits.push(subredditId) : user.favoriteSubreddits.splice(index2, 1)
        user.save(err=>{
          if(err) {
            error = err;
            status = 499;
          }
          data.user = user;
        });
      });
    }
    else {
      error = isSubscribe ? "Already subscribed!" : "You are not subscribed!";
    }
    return {error, data, status}
  });
}

router.post('/subscribe/:sid', (req, res)=>{
  let userId = parseJWT(req.headers.authorization)
  let info = subscriptionService(userId, req.params.sid, true)
  res.status(info.status).send(info.error ? info.error : info.data)
})

router.post('/unsubscribe/:sid', (req, res)=>{
  let userId = parseJWT(req.headers.authorization)
  let info = subscriptionService(userId, req.params.sid, false)
  res.status(info.status).send(info.error ? info.error : info.data)
})

router.post('/login', function(req, res, next){
  User.findOne({username: req.body.username}, function(err, user){
    if(err){
      res.status(499).send(err);
    }else if(!user || !user.validPassword(req.body.password)){
      res.status(499).send('Invalid login credentials');
    }else{
      let jwt = user.generateJWT();
      res.send(jwt);
    }
  })
});

router.get('/me/', Auth, (req, res) => {
  let userId = parseJWT(req.headers.authorization)

  User.findById(userId).populate('favoriteSubreddits').exec(function (err, data){
    err ? res.status(499).send(err) : res.send(data);
  })
});

router.get('/user/:id', Auth, (req, res) => {
  User.findById(req.params.id, (err, user)=> {
    if (err) res.status(499).send(err);
    else res.send(user);
  });
});

module.exports = router;
