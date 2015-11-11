"use strict";

let router = require("express").Router();
let auth = require('../config/auth');
let atob = require('atob');
var Post = require('../models/postSchema.js');
let Category = require('../models/categorySchema')

router.get('/', (req, res) => {
  Post.find({}, (err, posts) =>{
    err ? res.status(499).send(err) : res.send(posts)
  });
});

router.post('/addPost/:cid', auth, (req, res) => {
  let jwt = req.headers.authorization.replace(/Bearer /, "");
  let userID = (JSON.parse(atob(jwt.split('.')[1])))._id;

  let post = new Post()
  post.createdBy = userID;
  post.title = req.body.title;
  post.contentURL = req.body.contentURL;
  post.contentType = req.body.contentType;

  Category.findById(req.params.cid, (error, category) =>{
    if (err) {
      let message = "Could not find category"
      res.status(499).send({error, message})
    }
    else {
      post.save( (err, savedPost)=>{
        err ? res.status(499).send(err) : console.log("saved:", savedPost);
      });

      category.posts.push(post);
      category.save( (err, category) => {
        err ? res.status(499).send(err) : res.send(category);
      });
    }
  });
});



module.exports = router;
