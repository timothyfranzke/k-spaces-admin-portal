(function ()
{
    'use strict';

    angular
        .module('app.pages.profile', ['app.configuration'])
        .config(configuration);

    /** @ngInject */
    function configuration($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, config)
    {
        $stateProvider.state('app.pages_profile', {
            url      : '/pages/profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve  : {
/*                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },*/
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                }
                // PhotosVideos: function (msApi)
                // {
                //     return msApi.resolve('profile.photosVideos@get');
                // }
            },
            bodyClass: 'profile'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/profile');

        // Api
        //msApiProvider.register('profile.timeline', ['http://localhost:3002/api/activity']);
        msApiProvider.register('profile.about', [config.api.baseUrl + config.api.profile]);
        //msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('pages.profile', {
            title : 'Profile',
            icon  : 'icon-account',
            state : 'app.pages_profile',
            weight: 6
        });
    }

})();
