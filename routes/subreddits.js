"use strict";

let Auth = require('../config/auth')
let router = require('express').Router();
let Subreddit = require('../models/subredditSchema');
let parseJWT = require('../config/parseJWT')
let User = require('../models/userSchema')

router.get('/', (req, res)=> {
  Subreddit.find({}, (err, subreddits)=>{
    err ? res.status(499).send(err) : res.send(subreddits);
  });
});

router.post('/', Auth, (req, res) => {
  let data = req.body;
  data.createdBy = parseJWT(req.headers.authorization);
  Subreddit.create(data, (err, subreddit)=> {
    err ? res.status(499).send(err) : res.send(subreddit);
  });
});




module.exports = router;
