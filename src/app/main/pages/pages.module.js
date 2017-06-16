(function ()
{
  'use strict';

  angular
    .module('app.pages', [
      'app.pages.profile',
      'app.pages.redirect'
    ])
    .config(config);

  /** @ngInject */
  function config(msNavigationServiceProvider)
  {
    // Navigation
    msNavigationServiceProvider.saveItem('pages', {
      title : 'PAGES',
      group : true,
      weight: 2
    });
  }
})();
