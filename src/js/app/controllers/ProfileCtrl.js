var app = angular.module('redditApp');

app.controller('ProfileCtrl', function($scope, auth, $ionicModal, post, $rootScope) {
  auth.getCurrentUserInfo();

  // $ionicModal.fromTemplateUrl('html/post.html', {
  //   scope: $scope
  // }).then(function(landmarkModal) {
  //   $scope.landmarkModal = landmarkModal;
  // });


});
