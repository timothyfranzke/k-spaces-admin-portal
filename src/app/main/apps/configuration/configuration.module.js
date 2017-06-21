(function ()
{
  'use strict';

  angular
    .module('app.configuration',[])
    .constant('config', {
      api:{
        //baseUrl: 'https://k-spaces-api.herokuapp.com/api',
        baseUrl: 'http://localhost:3002/api',
        user:'/user',
        userGroup:'/user',
        calendar: '/event',
        spaces: '/spaces',
        location: '/location',
        profile: '/profile',
        parameters: {
          id: '/:id'
        }
      },
      securityApi: {
        baseUrl: 'https://tech-spaces-security.herokuapp.com',
        //baseUrl: 'http://localhost:3004',
        token: '/token',
        login: '/login'
      },
      authentication:{
        //baseUrl: 'https://k-spaces-authentication.herokuapp.com/pages/auth',
        baseUrl: 'http://localhost:3003/pages/auth',
        login: '/login',
        register: '/register'
      }
    });
})();
