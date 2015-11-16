var app = angular.module('redditApp');



app.controller('PostCtrl', function($scope, $http, Post, $ionicModal, $rootScope, auth) {
  auth.getCurrentUserInfo();

  $scope.newPost = function(post) {
    $http.post('/post', post)
      .then(function(data){
        console.log(data);
      })
      .catch(function(error){
        console.log(error);
      })
  }

});
