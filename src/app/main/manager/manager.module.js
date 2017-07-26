(function ()
{
    'use strict';

    angular
        .module('app.manager',
            [
                // 3rd Party Dependencies
                'wipImageZoom',
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, config)
    {
        // State
        $stateProvider
            .state('app.manager', {
                abstract: true,
                url     : '/manager'
            })
            .state('app.manager.locations', {
                url      : '/locations',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/manager/views/locations/locations.html',
                        controller : 'LocationsController as vm'
                    }
                },
                resolve  : {
                  Locations: function (managerService)
                    {
                        return managerService.getLocations();
                    }
                },
                bodyClass: 'location'
            })
          .state('app.manager.locations.detail', {
            url      : '/:id',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/location/location.html',
                controller : 'LocationDetailController as vm'
              }
            },
            resolve  : {
              Location        : function ($stateParams, managerService)
              {
                return managerService.getLocation($stateParams.id);
              },
              Spaces : function(managerService)
              {
                return managerService.getSpaces();
              }
            },
            bodyClass: 'location'
          })
          .state('app.manager.locations.add', {
            url      : '/add',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/location/location.html',
                controller : 'LocationDetailController as vm'
              }
            },
            resolve: {
              Location: function (managerService)
              {
                return managerService.newLocation();
              },
              Spaces : function(managerService)
              {
                return managerService.getSpaces();
              }
            },
            bodyClass: 'location'
          })
          .state('app.manager.spaces', {
            url      : '/spaces',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/spaces/spaces.html',
                controller : 'SpacesController as vm'
              }
            },
            resolve  : {
              Spaces: function (managerService)
              {
                return managerService.getSpaces();
              }
            },
            bodyClass: 'spaces'
          })
          .state('app.manager.spaces.detail', {
            url      : '/:id',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/space/space.html',
                controller : 'SpaceDetailController as vm'
              }
            },
            resolve  : {
              Space        : function ($stateParams, managerService)
              {
                return managerService.getSpace($stateParams.id);
              },
              Locations   : function ($stateParams, managerService)
              {
                return managerService.getLocations();
              },
              StudentUsers  : function ($stateParams, managerService)
              {
                return managerService.getStudentUsers();
              },
              FacultyUsers  : function ($stateParams, managerService)
              {
                return managerService.getFacultyUsers();
              }
            },
            bodyClass: 'space'
          })
          .state('app.manager.spaces.add', {
            url      : '/add',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/space/space.html',
                controller : 'SpaceDetailController as vm'
              }
            },
            resolve  : {
              Space        : function ($stateParams, managerService)
              {
                return managerService.newSpace();
              },
              Locations   : function ($stateParams, managerService)
              {
                return managerService.getLocations();
              },
              StudentUsers  : function ($stateParams, managerService)
              {
                return managerService.getStudentUsers();
              },
              FacultyUsers  : function ($stateParams, managerService)
              {
                return managerService.getFacultyUsers();
              }
            },
            bodyClass: 'space'
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/manager');

      // Api
      msApiProvider.register('manager.locations', [config.api.baseUrl + config.api.location]);
      msApiProvider.register('manager.spaces', [config.api.baseUrl + config.api.spaces]);
      msApiProvider.register('manager.users', [config.api.baseUrl + config.api.user]);
        // Navigation
        msNavigationServiceProvider.saveItem('manager', {
            title : 'Manager',
            icon  : 'account_balance',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('manager.locations', {
            title: 'Locations',
            state: 'app.manager.locations'
        });
        msNavigationServiceProvider.saveItem('manager.spaces', {
          title: 'Spaces',
          state: 'app.manager.spaces'
        });
    }
})();
