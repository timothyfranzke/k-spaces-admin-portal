(function ()
{
  'use strict';

  angular
    .module('app.common', [])
    .factory('CommonService', CommonService)
    .controller('ConfirmController', ConfirmController);

  /** @ngInject */
  function CommonService($q, $mdToast, config)
  {
    var service = {
      setToast : setToast,
      confirmDialog : confirmDialog
    };

    function setToast (message, type){
      var highlight = 'md-accent';
      if(type === config.toast_types.error)
      {
        highlight = 'md-warn';
        message = 'ERROR: ' + message;
      }
      var toast = $mdToast.simple()
        .textContent(message)
        .highlightClass(highlight)
        .position("top right");
      $mdToast.show(toast)
    }

    function confirmDialog (callback){
        $mdDialog.show({
          controller:'ConfirmController',
          templateUrl: 'app/main/services/common/dialogs/confirm/confirm.html',
          clickOutsideToClose: true,
          fullscreen : false
        }).then(callback);
    }

    return service;
  }

  function ConfirmController($scope){
    $scope.yes = function(){
      $mdDialog.hide();
    };
    $scope.no = function(){
      $mdDialog.cancel();
    };
  }
})();

