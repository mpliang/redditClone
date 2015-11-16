var app = angular.module('redditApp');

app.controller('LandingCtrl', function($scope, $http, $stateParams) {
  $scope.subreddits = [];
  $http.get('/posts')
    .then(function(data){
      console.log(data.data);
      $scope.posts = data.data;
    })
    .catch(function(error){
      console.log(error);
    })
});
