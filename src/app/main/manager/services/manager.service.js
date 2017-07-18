(function ()
{
    'use strict';

    angular
        .module('app.manager')
        .factory('managerService', managerService);

    /** @ngInject */
    function managerService($q, $mdToast, msApi, api, CommonService, config, $state)
    {
      var locations = [],
        spaces = [];

      var service = {
        getLocations     : getLocations
      };

      return service;

      //////////

      /**
       * Get locations
       */
      function getLocations()
      {
        // Create a new deferred object
        var deferred = $q.defer();

        // If we have already loaded the locations,
        // don't do another API call, get them from
        // the array
        if ( locations.length > 0 )
        {
          console.log(locations);
          deferred.resolve(locations);
        }
        // otherwise make an API call and load
        // the locations
        else
        {
          msApi.request('manager.locations@get', {},

            // SUCCESS
            function (response)
            {
              // Store the locations
              locations = response.data;
              console.log("http");
              console.log(locations);
              // Resolve the prom ise
              deferred.resolve(locations);
            },

            // ERROR
            function (response)
            {
              // Reject the promise
              deferred.reject(response);
            }
          );
        }

        return deferred.promise;
      }
    }

})();
