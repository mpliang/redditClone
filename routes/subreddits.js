"use strict";

let Auth = require('../config/auth')
let router = require('express').Router();
let Subreddit = require('../models/subredditSchema');

router.get('/', (req, res)=> {
  Subreddit.find({}, (err, subreddits)=>{
    err ? res.status(499).send(err) : res.send(subreddits);
  });
});

router.post('/', (req, res) => {
  Subreddit.create(req.body, (err, subreddit)=> {
    err ? res.status(499).send(err) : res.send(subreddit);
  });
});

router.post('/subscribe/:id', Auth, (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "");
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id;

  Subreddit.findById(req.params.id, (err, subreddit) =>{
    if (err) res.status(499).send(err)
    else{
      subreddit.subscribers.push(userID)
      subreddit.save((err, savedSubreddit)=>{
        if (err) res.status(499).send(err)
      })
    }
  })

  User.findById(userID, (err, user)=>{
    if (err) res.status(499).send(err)
    else {
      user.favoriteSubreddits.push(req.params.id)
      user.save((err, savedUser)=>{
        err ? res.status(499).send(err) : res.send(savedUser);
      })
    }
  })

})

router.post('/unsubscribe/:id', Auth, (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "");
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id;

  Subreddit.findById(req.params.id, (err, subreddit) =>{
    if (err) res.status(499).send(err)
    else{
      subreddit.subscribers.forEach((subscriber, index) => {
        if (subscriber === userID) subreddit.subscribers.splice(index, 1)
      })
      subreddit.save((err, savedSubreddit)=>{
        if (err) res.status(499).send(err)
      })
    }
  })

  User.findById(userID, (err, user)=>{
    if (err) res.status(499).send(err)
    else {
      user.favoriteSubreddits.forEach((favoriteSubreddit, index) =>{
        if (favoriteSubreddit === userID) user.favoriteSubreddit.splice(index, 1)
      });
      user.save((err, savedUser)=>{
        err ? res.status(499).send(err) : res.send(savedUser);
      });
    }
  });

});




module.exports = router;
