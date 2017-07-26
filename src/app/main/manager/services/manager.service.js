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
        spaces = [],
        users = [];

      var service = {
        getLocations     : getLocations,
        getLocation      : getLocation,
        createLocation    : createLocation,
        updateLocation    : updateLocation,
        newLocation       : newLocation,
        newSpace          : newSpace,
        deleteLocation    : deleteLocation,
        getSpaces         : getSpaces,
        getSpace          : getSpace,
        createSpace       : createSpace,
        updateSpace       : updateSpace,
        deleteSpace       : deleteSpace,
        getUsers          : getUsers,
        getFacultyUsers   : getFacultyUsers,
        getStudentUsers   : getStudentUsers
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
            "open": new Date("07/29/1983T08:00:00.000"),
            "close": new Date("07/29/1983T18:00:00.000")
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
          "avatar": {
            "thumb":"",
            "full":""
          },
          "spaces":[],
          "hasImage":false
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
          "location": "",
          "tags": [],
          "students":[],
          "faculty" : [],
          "avatar": {
            "thumb":"",
            "full":""
          },
          "required_faculty" : 0,
          "max_students" : 0
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
            var locationId = res.insertedIds[0];
            image.id = locationId;
            api.image.save(image, function(){
              console.log(res);
              location._id = locationId;
              location.avatar.full = config.image.full + image.id + "/" + image.id + ".png";
                location.avatar.thumb = config.image.thumb + image.id + "/thumbs/" + image.id + ".png";

              api.location.update({id: locationId}, location, function(res){
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
      function deleteLocation(location){
        var index = 0;
        api.location.remove({id: location._id}, function(){
          CommonService.setToast('Location Deleted', config.toast_types.info);
          locations.forEach(function(item){
            if(item._id == location._id)
            {
              item = location;
            }
            else{
              index++;
            }
          });
          locations.splice(index, 1);
        })
      }
      /**
       * Get locations
       */
      function getSpaces()
      {
        // Create a new deferred object
        var deferred = $q.defer();

        // If we have already loaded the locations,
        // don't do another API call, get them from
        // the array
        if ( spaces.length > 0 )
        {
          console.log(spaces);
          deferred.resolve(spaces);
        }
        // otherwise make an API call and load
        // the locations
        else
        {
          msApi.request('manager.spaces@get', {},

            // SUCCESS
            function (response)
            {
              // Store the locations
              spaces = response.data;
              console.log("http spaces");
              console.log(spaces);
              // Resolve the prom ise
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
    * Get location by id
    *
    * @param id
    */
    function getSpace(id)
    {
      // Create a new deferred object
      var deferred = $q.defer();

      // Iterate through the locations and find
      // the correct one. This is an unnecessary
      // code as in real world, you would do
      // another API call here to get the product
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

      /**
       * Create product
       *
       * @param product
       */
      function createSpace(space, image, students, faculty)
      {
        // This is a dummy function for a demo.
        // In real world, you would do an API
        // call to add new product to your
        // database.

        api.spaces.save(space, function(res){
          if(!!image)
          {
            var spaceId = res.insertedIds[0];
            students.forEach(function(student){
              student.space_id = spaceId;
              api.userDetail.update({id:student._id}, student);
            });
            faculty.forEach(function(faculty){
              faculty.space_id = spaceId;
              api.userDetail.update({id:faculty._id}, faculty);
            });
            image.id = spaceId;
            api.image.save(image, function(){
                console.log(res);
                space._id = spaceId;
                space.avatar.full = config.image.full + image.id + "/" + image.id + ".png";
                space.avatar.thumb = config.image.thumb + image.id + "/thumbs/" + image.id + ".png";

                api.spaces.update({id: spaceId}, space, function(res){
                    spaces.unshift(space);
                    CommonService.setToast(space.name + ' Created Successfully', config.toast_types.info);
                    $state.go('app.manager.spaces');
                  },
                  function(err){
                    CommonService.setToast(err, config.toast_types.error);
                    $state.go('app.manager.spaces');
                  });
              },
              function(err){
                CommonService.setToast(err, config.toast_types.error);
                $state.go('app.manager.spaces');
              }
            )
          }
          else{
            console.log(res);
            CommonService.setToast(space.name + ' Created Successfully', config.toast_types.info);
            $state.go('app.manager.spaces');
          }
        }, function(err){
          CommonService.setToast(err, config.toast_types.error);
          $state.go('app.manager.spaces');
        });
      }

      /**
       * Update the location
       *
       * @param id
       * @param product
       */
      function updateSpace(id, space, students, faculty)
      {
        api.spaces.update({id: id}, space, function(res){
          spaces.forEach(function(item){
            if(item._id == id)
            {
              item = space;
            }
          });
          students.forEach(function(student){
            api.user.update({id:student._id}, student);
          });
          faculty.forEach(function(faculty){
            api.user.update({id:faculty._id}, faculty);
          });
          CommonService.setToast("Updated " + space.name, config.toast_types.info);
          $state.go('app.manager.spaces');
        }, function(err){
          CommonService.setToast(err, config.toast_types.error);
          $state.go('app.manager.spaces');
        });
      }
      function deleteSpace(space){
        var index = 0;
        var deleteIndex = 0;
        api.spaces.remove({id: space._id}, function(){
          CommonService.setToast('Space Deleted', config.toast_types.info);
          spaces.forEach(function(item){
            if(item._id == space._id)
            {
              deleteIndex = index;
            }
            else{
              index++;
            }
          });
          spaces.splice(deleteIndex, 1);
        })
      }
      /**
       * Get users
       */
      function getUsers()
      {
        // Create a new deferred object
        var deferred = $q.defer();

        // If we have already loaded the locations,
        // don't do another API call, get them from
        // the array
        if ( users.length > 0 )
        {
          console.log(users);
          deferred.resolve(users);
        }
        // otherwise make an API call and load
        // the locations
        else
        {
          msApi.request('manager.users@get', {},

            // SUCCESS
            function (response)
            {
              // Store the locations
              users = response.data;
              console.log("http");
              console.log(users);
              // Resolve the prom ise
              deferred.resolve(users);
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
       * Get users
       */
      function getFacultyUsers()
      {
        // Create a new deferred object
        var deferred = $q.defer();
        var facultyUsers = [];
        // If we have already loaded the locations,
        // don't do another API call, get them from
        // the array
        if ( users.length > 0 )
        {
          console.log(users);
          users.forEach(function(user){
            if(user.role === 'faculty')
            {
              facultyUsers.push(user)
            }
          });
          console.log('done faculty');
          deferred.resolve(facultyUsers);
        }
        // otherwise make an API call and load
        // the locations
        else
        {
          msApi.request('manager.users@get', {},

            // SUCCESS
            function (response)
            {
              // Store the locations
              users = response.data;
              users.forEach(function(user){
                if(user.role === 'faculty')
                {
                  facultyUsers.push(user)
                }
              });
              console.log('done faculty');
              // Resolve the prom ise
              deferred.resolve(facultyUsers);
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
       * Get users
       */
      function getStudentUsers()
      {
        // Create a new deferred object
        var deferred = $q.defer();
        var studentUsers = [];
        // If we have already loaded the locations,
        // don't do another API call, get them from
        // the array
        if ( users.length > 0 )
        {
          console.log(users);
          users.forEach(function(user){
            if(user.role === 'student')
            {
              studentUsers.push(user)
            }
          });
          deferred.resolve(studentUsers);
        }
        // otherwise make an API call and load
        // the locations
        else
        {
          msApi.request('manager.users@get', {},

            // SUCCESS
            function (response)
            {
              // Store the locations
              users = response.data;
              users.forEach(function(user){
                if(user.role === 'student')
                {
                  studentUsers.push(user)
                }
              });
              // Resolve the prom ise
              deferred.resolve(studentUsers);
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
