var app = angular.module('redditApp');

app.controller('LandingCtrl', function($scope, $http, $stateParams) {
  $scope.subreddits = [];
  $http.get('/all')
    .then(function(data){
      console.log(data);
      data.data.forEach(function(e){
        console.log(e);
        e.posts.forEach(function(p){
          $scope.subreddits.push(p);
        })
      })
    })
    .catch(function(error){
      console.log(error);
    })
});
