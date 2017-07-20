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
        getLocations     : getLocations,
        getLocation      : getLocation,
        createLocation    : createLocation,
        updateLocation    : updateLocation,
        newLocation       : newLocation,
        newSpace          : newSpace
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

      /**
       * Get location by id
       *
       * @param id
       */
      function getLocation(id)
      {
        // Create a new deferred object
        var deferred = $q.defer();

        // Iterate through the locations and find
        // the correct one. This is an unnecessary
        // code as in real world, you would do
        // another API call here to get the product
        // details
        for ( var i = 0; i < locations.length; i++ )
        {
          if ( locations[i]._id === id )
          {
            deferred.resolve(locations[i]);
          }
        }

        return deferred.promise;
      }

      /**
       * Update the location
       *
       * @param id
       * @param product
       */
      function updateLocation(id, location)
      {
        api.location.update({id: id}, location, function(res){
          locations.forEach(function(item){
            if(item._id == id)
            {
              item = location;
            }
          });
          CommonService.setToast("Updated Location", config.toast_types.info);
          $state.go('app.manager.locations');
        }, function(err){
          CommonService.setToast(err, config.toast_types.error);
          $state.go('app.manager.locations');
        });
      }

      /**
       * Returns a default product structure
       */
      function newLocation()
      {
        return {
          "hours": {
            "open": new Date(),
            "close": new Date()
          },
          "days_of_week": {
            "sunday"  : false,
            "monday": true,
            "wednesday": true,
            "thursday": true,
            "friday": true,
            "saturday" :  false
          },
          "name": "",
          "avatar_url": "",
          "spaces":[]
        };
      }

      /**
       * Returns a default product structure
       */
      function newSpace() {
        return {
          "name": "",
          "description": "",
          "categories": [],
          "location": {},
          "tags": [],
          "students":[],
          "faculty" : [],
          "required_faculty" : 0,
          "allowed_students" : 0
        }
      }
      /**
       * Create product
       *
       * @param product
       */
      function createLocation(location, image)
      {
        // This is a dummy function for a demo.
        // In real world, you would do an API
        // call to add new product to your
        // database.

        api.location.save(location, function(res){
          if(!!image)
          {
            image.id = res.insertedIds[0];
            api.image.save(image, function(){
              console.log(res);
              location._id = image.id;
              location.avatar = config.image.dir + image.id + "/" + image.id + ".png";

              api.location.update({id: id}, location, function(res){
                  locations.unshift(location);
                  CommonService.setToast('Location Created', config.toast_types.info);
                  $state.go('app.manager.locations');
              },
              function(err){
                CommonService.setToast(err, config.toast_types.error);
                $state.go('app.manager.locations');
              });
            },
            function(err){
              CommonService.setToast(err, config.toast_types.error);
              $state.go('app.manager.locations');
            }
            )
          }
          else{
            console.log(res);
            CommonService.setToast('Location Created', config.toast_types.info);
            $state.go('app.manager.locations');
          }
        }, function(err){
          CommonService.setToast(err, config.toast_types.error);
          $state.go('app.manager.locations');
        });
      }
    }

})();
