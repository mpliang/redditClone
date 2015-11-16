var app = angular.module('redditApp');

app.factory('Post', function($window, $http, auth){
  var post = {};

  post.getAll = function(){
    return $http.get('/posts')
  }

  post.getOne = function(id){
    return $http.get(`/posts/${id}`)
  }

  post.subscribe = (id) => {
    $http.defaults.headers.common.Authorization = `Bearer ${auth.getToken()}`;
    return $http.post(`/users/subscribe/${id}`)
  }

  post.upvote = (id) => {
    $http.defaults.headers.common.Authorization = `Bearer ${auth.getToken()}`;
    return $http.put(`/posts/upvote/${id}`)
  }

  post.downvote = (id) 

  post.testIndex = (arr, id) =>{
    let index = false;
    arr.forEach(post => {
      if (post._id === id) index = true
    })
    return index
  }

  return post;
})
