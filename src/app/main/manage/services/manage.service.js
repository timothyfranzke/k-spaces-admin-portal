(function ()
{
  'use strict';

  angular
    .module('app.manage')
    .factory('manageService', manageService);

  /** @ngInject */
  function manageService($q, $mdToast, msApi, api, CommonService, config, $state)
  {
    var locations = [],
      spaces = [];

    var service = {
      getLocations     : getLocations,
      getLocation      : getLocation,
      updateLocation   : updateLocation,
      newProduct      : newProduct,
      createLocation   : createLocation,
      getSpace        : getSpace,
      getSpaces       : getSpaces
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
        console.log("LOCATIONS!");
        console.log(locations);
        deferred.resolve(locations);
      }
      // otherwise make an API call and load
      // the locations
      else
      {
        console.log("Gettin' dat location son!");
        api.location.list(

          // SUCCESS
          function (response)
          {
            console.log("Http LOCATIONS!");
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
            console.log("error on location son!");
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
        $state.go('app.manage.locations');
      }, function(err){
        CommonService.setToast(err, config.toast_types.error);
        $state.go('app.manage.locations');
      });
    }

    /**
     * Returns a default product structure
     */
    function newProduct()
    {
      return {
        students        : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        quantity        : 0,
        extraShippingFee: 0,
        active          : false
      };
    }

    /**
     * Create product
     *
     * @param product
     */
    function createLocation(location)
    {
      // This is a dummy function for a demo.
      // In real world, you would do an API
      // call to add new product to your
      // database.

      api.location.save(location, function(){

        locations.unshift(location);

        CommonService.setToast('Location Created', config.toast_types.info);
        $state.go('app.manage.locations');
      }, function(err){
        CommonService.setToast(err, config.toast_types.error);
        $state.go('app.manage.locations');
      });


    }

    /**
     * Get orders
     */
    function getSpaces()
    {
      // Create a new deferred object
      var deferred = $q.defer();

      // If we have already loaded the orders,
      // don't do another API call, get them from
      // the array
      if ( spaces.length > 0 )
      {
        deferred.resolve(spaces);
      }
      // otherwise make an API call and load
      // the orders
      else
      {
        msApi.request('manage.spaces@get', {},

          // SUCCESS
          function (response)
          {
            // Store the orders
            spaces = response.data;

            // Resolve the promise
            deferred.resolve(spaces);
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
     * Get order by id
     *
     * @param id
     */
    function getSpace(id)
    {
      // Create a new deferred object
      var deferred = $q.defer();

      // Iterate through the orders and find
      // the correct one. This is an unnecessary
      // code as in real world, you would do
      // another API call here to get the order
      // details
      for ( var i = 0; i < spaces.length; i++ )
      {
        if ( spaces[i]._id === id )
        {
          deferred.resolve(spaces[i]);
        }
      }

      return deferred.promise;
    }
  }

})();
