var app = angular.module('redditApp');



app.controller('PostCtrl', function($scope, $http, $ionicLoading, $compile, post, $ionicModal, $rootScope, $state, auth) {
  auth.getCurrentUserInfo();

  $scope.newPost = function(post) {
    console.log(post);
    $http.post('/post', post)
      .then(function(data){
        console.log(data);
        $state.go('app.landing');
      })
      .catch(function(error){
        console.log(error);
      })
  }

});
