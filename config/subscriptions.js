"use strict";

let subscriptionService = (req, res, next)=>{
  let userId = parseJWT(req.headers.authorization);
  let subredditId = req.params.sid;
  let isSubscribe = req.body.isSubscribe === "true" ? true : false;

  Subreddit.findById(subredditId, (err, subreddit) => {
    if(err) res.status(499).send(err);
    let index1 = subreddit.subscribers.indexOf(userId);
    if(index1 === -1 && isSubscribe || index1 !== -1 && !isSubscribe){
      isSubscribe ? subreddit.subscribers.push(userId) : subreddit.subscribers.splice(index1, 1);
      subreddit.save(err =>{
        if(err) res.status(499).send(err);

        req.savedSubreddit = subreddit;
      })
      User.findById(userId, (err, user)=>{
        if(err) res.status(499).send(err);
        let index2 = user.favoriteSubreddits.indexOf(subredditId);
        isSubscribe ?  user.favoriteSubreddits.push(subredditId) : user.favoriteSubreddits.splice(index2, 1);
        user.save(err=>{
          if(err) res.status(499).send(err);

          res.send({user, subreddit});
        });
      });
    }
    else {
      res.status(444).send(isSubscribe ? "Already subscribed!" : "You are not subscribed!");
    }
  });
}

module.exports = subscriptionService;
