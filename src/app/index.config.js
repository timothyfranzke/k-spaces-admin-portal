(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($translateProvider, $mdThemingProvider)
    {
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
      $mdThemingProvider.definePalette('spaces-light', {
        '50': '#55c3d4',
        '100': '#55c3d4',
        '200': '#55c3d4',
        '300': '#55c3d4',
        '400': '#55c3d4',
        '500': '#55c3d4',
        '600': '#55c3d4',
        '700': '#55c3d4',
        '800': '#55c3d4',
        '900': '#55c3d4',
        'A100': '#55c3d4',
        'A200': '#55c3d4',
        'A400': '#55c3d4',
        'A700': '#55c3d4',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
          '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.definePalette('spaces-dark', {
        '50': '#2a4362',
        '100': '#2a4362',
        '200': '#2a4362',
        '300': '#2a4362',
        '400': '#2a4362',
        '500': '#2a4362',
        '600': '#2a4362',
        '700': '#2a4362',
        '800': '#2a4362',
        '900': '#2a4362',
        'A100': '#2a4362',
        'A200': '#2a4362',
        'A400': '#2a4362',
        'A700': '#2a4362',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
          '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.theme('default')
        .primaryPalette('spaces-light')
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('spaces-dark', {
          'default': '600' // use shade 200 for default, and keep all other shades the same
        });
    }

  angular
    .module('fuse').factory('httpRequestInterceptor', function () {
    return {
      request: function (config) {
        if(!!localStorage.getItem('token'))
          config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        else if(!!localStorage.getItem('refreshToken')){
          var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MzVhZGJmZTFhOGY0OWQ3NTY1ODg5ZiIsInJvbGVzIjpbInN5cy1hZG1pbiIsImFkbWluIiwiYWRtaW4iXSwiYXBwbGljYXRpb25fZGF0YSI6eyJlbnRpdHlfaWQiOiI1OTM1YWU3ZWUxYThmNDlkNzU2NTg5MjEifSwiaWF0IjoxNDk2NzE0NTcxLCJleHAiOjE0OTY3MzI1NzEsImF1ZCI6Imstc3BhY2VzLmhlcm9rdWFwcC5jb20iLCJpc3MiOiJodHRwczovL3d3dy50ZWNoLXNwYWNlcy1zZWN1cml0eS5jb20ifQ.cmWGWCIRNi_mnBuu8GwV-VmmJPR1lG82YwE_L_z0UwI';
          config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          localStorage.setItem('token', token);
        }
        return config;
      },
      response: function(config){
        //console.log(config);
        return config;
      },
      responseError : function(config){
        //console.log(config);
        switch(config.status){
          case 401:
          case 403:
            //console.log("403");
            localStorage.clear();
            window.location.replace("https://k-spaces-authentication.herokuapp.com/pages/auth/login");
            break;
        }
        return config;
      }
    };
  });

  angular
    .module('fuse').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  });

})();
