(function ()
{
  'use strict';

  angular
    .module('app.configuration',[])
    .constant('config', {
      api:{
        baseUrl: 'http://localhost:3002/api',
        user:'/user',
        userGroup:'/userGroup',
        calendar: '/calendar',
        spaces: '/spaces',
        location: '/location',
        profile: '/profile',
        parameters: {
          id: '/:id'
        }
      },
      securityApi: {
        baseUrl: 'http://localhost:3004',
        token: '/token',
        login: '/login'
      },
      authentication:{
        baseUrl: 'http://localhost:3003/pages/auth',
        login: '/login',
        register: '/register'
      }
    });
})();
