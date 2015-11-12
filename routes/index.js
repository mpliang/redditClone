var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post', function(req, res, next) {
  Subreddit.findByIdAndUpdate(
    req.params.id,
    {$push: {"post": {
      title: req.body.title,
      author: req.user._id,
      link: req.body.link,
      body: req.body.body
    }}},
    {safe: true, upsert: true},
    function(err, newPost) {
      console.log(newPost);
      res.status(err ? 400 : 200).send(err || newPost);
  });
})

module.exports = router;
