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
              }
            },
            bodyClass: 'manage'
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
              }
            },
            bodyClass: 'manage'
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/manager');

      // Api
      msApiProvider.register('manager.locations', [config.api.baseUrl + config.api.location]);
      msApiProvider.register('manager.spaces', [config.api.baseUrl + config.api.spaces]);
        // Navigation
        msNavigationServiceProvider.saveItem('manager', {
            title : 'Manager',
            icon  : 'icon-cart',
            weight: 3
        });

        msNavigationServiceProvider.saveItem('manager.locations', {
            title: 'Locations',
            state: 'app.manager.locations'
        });
    }
})();
