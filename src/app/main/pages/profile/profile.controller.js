(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(About, config)
    {
        var vm = this;

        // Data
        //vm.posts = Timeline.posts;
        //vm.activities = Timeline.activities;
        vm.about = About.data;
        //vm.photosVideos = PhotosVideos.data;

        // Methods

        //////////
    }

})();
