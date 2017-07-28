(function ()
{
  'use strict';

  angular
    .module('app.common', [])
    .factory('CommonService', CommonService)
    .controller('ConfirmController', ConfirmController);

  /** @ngInject */
  function CommonService($q, $mdToast, config, api)
  {
    var profile = {};
    var service = {
      setToast : setToast,
      confirmDialog : confirmDialog,
      getProfile  : getProfile
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
        .position("bottom right");
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

    function getProfile (){
      // Create a new deferred object
      var deferred = $q.defer();

      // If we have already loaded the locations,
      // don't do another API call, get them from
      // the array
      if(profile.legal_name !== undefined)
      {
        console.log(profile);
        deferred.resolve(profile);
      }
      // otherwise make an API call and load
      // the locations
      else
      {
        api.profile.get(function(res){
            profile = res.data;
            deferred.resolve(profile);
          },

          function(err){
            deferred.reject(err);
          }
        );
      }
      return deferred.promise;
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

