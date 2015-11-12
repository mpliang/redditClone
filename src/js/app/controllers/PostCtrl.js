var app = angular.module('redditApp');



app.controller('PostCtrl', function($scope, $http, $ionicLoading, $compile, landmark, $ionicModal, $rootScope, auth) {
  auth.getCurrentUserInfo();

  $scope.newPost = function(post) {
    console.log(post);
    $http.post('/post', post)
      .then(function(data){
        console.log(data);
      })
      .catch(function(error){
        console.log(error);
      })
  }

});
