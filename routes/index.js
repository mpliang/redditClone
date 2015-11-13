var express = require('express');
var router = express.Router();
var Subreddit = require('../models/subredditSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all', function(req, res) {
  console.log('getting all posts');
  Subreddit.find({}, function(err, subreddits) {
    console.log(subreddits);
    res.json(subreddits);
  });
});

router.post('/post', function(req, res, next) {
  console.log(req.body);
  Subreddit.find({name: req.body.sub}, function(err, subreddit) {
    console.log(subreddit);
      if (subreddit[0] !== undefined) {
        subreddit[0].posts.push(req.body.body);
        subreddit[0].save();
      }
      else {
        Subreddit.create({
          name: req.body.sub,
        }, function() {
          Subreddit.find({name: req.body.sub}, function(err, sub) {
            console.log(sub);
            // user.subreddits = [{name: req.body.sub, instId: inst[0]._id}];
            // user.save();
            res.status(err ? 400 : 200).send(err || sub);
          });
        });
      }
    });
  // Subreddit.find(
  //   req.body.sub,
  //   {$push: {"post": {
  //     title: req.body.title,
  //     author: req.user._id,
  //     link: req.body.link,
  //     body: req.body.body
  //   }}},
  //   {safe: true, upsert: true},
  //   function(err, newPost) {
  //     console.log(newPost);
  //     res.status(err ? 400 : 200).send(err || newPost);
  // });
})

module.exports = router;
