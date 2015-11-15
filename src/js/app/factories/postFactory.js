var app = angular.module('redditApp');

app.factory('post', function($window, $http, auth){
  var post = {};

  post.getAll = function(){
    return $http.get('/posts')
  }

  post.getOne = function(id){
    return $http.get(`/reddit/${id}`)
  }

  post.subscribe = (id) => {
    $http.defaults.headers.common.Authorization = `Bearer ${auth.getToken()}`;
    return $http.post(`/users/subscribe/${id}`)
  }

  post.testIndex = (arr, id) =>{
    let index = false;
    arr.forEach(post => {
      if (post._id === id) index = true
    })
    return index
  }

  return post;
})
