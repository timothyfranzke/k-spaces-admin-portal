(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(About, config, $mdDialog, $document)
    {
        var vm = this;

        // Data
        //vm.posts = Timeline.posts;
        //vm.activities = Timeline.activities;
        vm.about = About.data;
        //vm.photosVideos = PhotosVideos.data;

      vm.openProfileDialog = openProfileDialog;

        // Methods
      /**
       * Open new contact dialog
       *
       * @param ev
       */
      function openProfileDialog(ev)
      {
        $mdDialog.show({
          controller         : 'ContactDialogController',
          controllerAs       : 'vm',
          templateUrl        : 'app/main/pages/profile/dialogs/contact/contact-dialog.html',
          parent             : angular.element($document.find('#profile')),
          targetEvent        : ev,
          clickOutsideToClose: true,
          locals             : {
            User    : vm.about
          }
        });
      }
        //////////
    }

})();
