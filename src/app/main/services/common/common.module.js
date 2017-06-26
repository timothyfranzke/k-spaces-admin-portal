(function ()
{
  'use strict';

  angular
    .module('app.common', [])
    .factory('CommonService', CommonService);

  /** @ngInject */
  function CommonService($q, $mdToast, config)
  {
    var service = {
      setToast : setToast
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

    return service;
  }
})();

