(function ()
{
  'use strict';

  angular
    .module('app.dashboard',
      [
        // 3rd Party Dependencies
      ]
    )
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider)
  {
    // State
    $stateProvider
      .state('app.dashboard', {
        url      : '/dashboard',
        views    : {
          'content@app': {
            templateUrl: 'app/main/dashboard/dashboard.html',
            //controller : 'DashboardController as vm'
          }
        },
        bodyClass: 'dashboard'
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/dashboard');

    // Api


    // Navigation
  }
})();
