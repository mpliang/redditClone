"use strict";

let router = require("express").Router();
let Auth = require('../config/auth');
let atob = require('atob');
let Post = require('../models/postSchema.js');
let Subreddit = require('../models/subredditSchema');

router.get('/', (req, res) => {
  Post.find({}).populate('createdBy').exec( (err, posts) =>{
    err ? res.status(499).send(err) : res.send(posts);
  });
});


router.post('/addPost/:sid', Auth, (req, res) => {
  let jwt = req.headers.authorization.replace(/Bearer /, "");
  let userId = (JSON.parse(atob(jwt.split('.')[1])))._id;

  let post = new Post();
  post.createdBy = userId;
  post.title = req.body.title;
  post.contentURL = req.body.contentURL;
  post.contentType = req.body.contentType;
  post.subreddit = req.params.sid


  Subreddit.findById(req.params.sid, (err, subreddit) =>{
    if (err) res.status(499).send(err);
    else {
      subreddit.recentPosts.push(post);

      if (subreddit.recentPosts.length > 100) subreddit.recentPosts.pop()

      subreddit.save( (err, subreddit) => {
        if (err) res.status(499).send(err);
      });

      post.save( (err, savedPost)=>{
        err ? res.status(499).send(err) : res.send(savedPost);
      });

    }
  });
});

router.put('/upvote/:id', Auth, (req, res) => {
  let jwt = req.headers.authorization.replace(/Bearer /, "");
  let userId = (JSON.parse(atob(jwt.split('.')[1])))._id;

  Post.findById(req.params.id, (err, post) =>{
    if(err) res.status(499).send(err)
    else {
      if(post.votingUsers.indexOf(userId)===-1){
        post.votingUsers.push(userId)
        post.score++;
        post.save((err, post) =>{
          err ? res.status(499).send(err) : res.send(post)
        });
      }
      else res.send('Already voted!')
    }
  });
});

router.put('/downvote/:id', Auth, (req, res) => {
  let jwt = req.headers.authorization.replace(/Bearer /, "");
  let userId = (JSON.parse(atob(jwt.split('.')[1])))._id;

  Post.findById(req.params.id, (err, post) =>{
    if(err) res.status(499).send(err)
    else {
      if(post.votingUsers.indexOf(userId)!==-1){
        post.votingUsers.push(userId)
        post.score--;
        post.save((err, post) =>{
          err ? res.status(499).send(err) : res.send(post)
        });
      }
      else res.send('Already voted!')
    }
  });
});

router.post('/comment/:id', Auth, (req, res) => {
  let jwt = req.headers.Authorization.replace(/Bearer /, "");
  let userId = (JSON.parse(atob(jwt.split('.')[1])))._id;

  let comment = new Comment()
  comment.creadedBy = userId;
  parentType: "post";
  parent.post = req.params.id;
  content: req.body.comment;

})

module.exports = router;
