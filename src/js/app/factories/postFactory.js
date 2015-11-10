var app = angular.module('redditApp');

app.factory('post', function($window, $http, auth){
  var post = {};

  post.getAll = function(){
    return $http.get('/reddit')
  }

  post.getOne = function(id){
    return $http.get(`/reddit/${id}`)
  }

  post.addToVisited = (id) => {
    $http.defaults.headers.common.Authorization = `Bearer ${auth.getToken()}`;
    return $http.post(`/users/visited/${id}`)
  }

  post.addToFavorites = (id) => {
    $http.defaults.headers.common.Authorization = `Bearer ${auth.getToken()}`;
    return $http.post(`/users/favorites/${id}`)
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
