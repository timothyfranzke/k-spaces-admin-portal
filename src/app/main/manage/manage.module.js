(function ()
{
  'use strict';

  angular
    .module('app.manage',
      [
      ]
    )
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, config)
  {
    // State
    $stateProvider
      .state('app.manage', {
        abstract: true,
        url     : '/manage'
      })
      .state('app.manage.spaces', {
        url      : '/spaces',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manage/views/spaces/spaces.html',
            controller : 'SpacesController as vm'
          }
        },
        resolve  : {
          Spaces: function (manageService)
          {
            return manageService.getSpaces();
          }
        },
        bodyClass: 'spaces'
      })
      .state('app.manage.locations', {
        url      : '/locations',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manage/views/locations/locations.html',
            controller : 'LocationsController as vm'
          }
        },
        resolve  : {
          Locations: function (manageService)
          {
            return manageService.getLocations();
          }
        },
        bodyClass: 'locations'
      })
      .state('app.manage.locations.detail', {
        url      : '/:id',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manage/views/location/locaiton.html',
            controller : 'LocationController as vm'
          }
        },
        resolve  : {
          Location        : function ($stateParams, manageService)
          {
            return manageService.getLocation($stateParams.id);
          },
          Space : function($stateParams, manageService){
            return manageService.getSpace($stateParams.id);
          }
        },
        bodyClass: 'manage'
      })
      .state('app.manage.spaces.detail', {
        url      : '/:id',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manage/views/space/space.html',
            controller : 'SpaceDetailController as vm'
          }
        },
        resolve  : {
          Space        : function ($stateParams, manageService)
          {
            return manageService.getSpace($stateParams.id);
          }
        },
        bodyClass: 'manage'
      });


    // Translation
    $translatePartialLoaderProvider.addPart('app/main/manage');

    // Api
    msApiProvider.register('manage.locations', [config.api.baseUrl + config.api.location]);
    msApiProvider.register('manage.spaces', [config.api.baseUrl + config.api.spaces]);

    // Navigation
    msNavigationServiceProvider.saveItem('manage', {
      title : 'Manage',
      icon  : 'icon-cart',
      weight: 3
    });

    msNavigationServiceProvider.saveItem('manage.locations', {
      title: 'Locations',
      state: 'app.manage.locations'
    });


    msNavigationServiceProvider.saveItem('manage.spaces', {
      title: 'Spaces',
      state: 'app.manage.spaces'
    });
  }
})();
