(function ()
{
  'use strict';

  angular
    .module('app.configuration',[])
    .constant('config', {
      api:{
        //baseUrl: 'https://k-spaces-api.herokuapp.com/api',
        baseUrl: 'http://localhost:3008/api',
        user:'/user',
        userGroup:'/user',
        calendar: '/event',
        spaces: '/spaces',
        search: '/search',
        location: '/location',
        profile: '/profile',
        financial: '/financial',
        tuitionRate: '/tuition_rate',
        pay_period: '/pay-period',
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
      },
      image:{
        baseUrl: 'http://www.franzkedesigner.com/kspaces-img',
        create: '/CreateImageService.php'
      },
      toast_types:{
        error: 1,
        info: 2
      }
    });
})();
