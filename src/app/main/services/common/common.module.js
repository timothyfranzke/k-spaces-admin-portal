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
      setToast      : setToast,
      confirmDialog : confirmDialog,
      getProfile    : getProfile,
      isEmptyObject : isEmpty
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

  function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }
})();

