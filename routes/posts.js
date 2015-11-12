"use strict";

let router = require("express").Router();
let Auth = require('../config/auth');
let atob = require('atob');
let Post = require('../models/postSchema.js');
let Subreddit = require('../models/subredditSchema');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) =>{
    err ? res.status(499).send(err) : res.send(posts);
  });
});


router.post('/addPost/:sid', (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "");
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id;

  let post = new Post();
  post.createdBy = userID;
  post.title = req.body.title;
  post.contentURL = req.body.contentURL;
  post.contentType = req.body.contentType;

  Subreddit.findById(req.params.sid, (error, subreddit) =>{
    if (err) res.status(499).send(err);
    else {
      post.save( (err, savedPost)=>{
        err ? res.status(499).send(err) : console.log("saved:", savedPost);
      });

      subreddit.posts.push(post);
      subreddit.save( (err, subreddit) => {
        err ? res.status(499).send(err) : res.send(subreddit);
      });
    }
  });
});

router.post('/upvote/:id', Auth, (req, res) => {
  Post.findById(req.params.id, (err, post) =>{
    if(err) res.status(499).send(err)
    else {
      post.score++;
      post.save((err, post) =>{
        err ? res.status(499).send(err) : res.send(post)
      });
    }
  });
});

router.post('/downvote/:id', Auth, (req, res) => {
  Post.findById(req.params.id, (err, post) =>{
    if(err) res.status(499).send(err)
    else {
      post.score--;
      post.save((err, post) =>{
        err ? res.status(499).send(err) : res.send(post)
      });
    }
  });
});

router.post('/comment/:id', Auth, (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "");
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id;

  let comment = new Comment()
  comment.creadedBy = userID;
  parentType: "post";
  parent.post = req.params.id;
  content: req.body.comment;
  

})

module.exports = router;
