"use strict";

let router = require('express').Router();
let Comment = require('../models/commentSchema');

router.post('/', (req, res)=>{
  Comment.create(req.body, (err, comment)=>{
    err ? res.status(499).send(err) : res.send(comment);
  });
});

router.get('/:postId', (req, res) => {
  Comment.find({parentPost: req.params.postId}, (err, comments) =>{
    if(err) res.status(499).send(err)
    else {
      comments.sort((a, b) => b.score - a.score)
      res.send(comments)
    }
  });
});


module.exports = router
