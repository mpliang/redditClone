"use strict";
let Post = require('../models/postSchema')
require('mongoose').connect('mongodb://localhost/reddit')
let dummypost = {
  title: "Lorem ipsum dolor sit amet.",
  contentURL: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, nesciunt.",
  contentType: "dummy"
}


for (var i = 0; i < 12; i++) {
  Post.create(dummypost, (err, post)=>{
    if (err) console.log(err);
    else console.log(post);
  })
}
