(function () {
  'use strict';

  angular
    .module('app.avatar-generator')
    .controller('AvatarGeneratorController', AvatarGeneratorController);

  /** @ngInject */
  function AvatarGeneratorController($scope, $mdDialog) {
    $scope.processImage = function(image){
      $scope.image = image;
    };
    $scope.select = function(){
      $mdDialog.hide($scope.image);
    };
    $scope.cancel = function(){
      $mdDialog.cancel();
    };
  }
});
