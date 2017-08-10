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
        console.log(vm.about);
        //vm.photosVideos = PhotosVideos.data;

      vm.openProfileDialog = openProfileDialog;
      vm.openContactInfoDialog = openContactInfoDialog;

        // Methods
      /**
       * Open new contact dialog
       *
       * @param ev
       */
      function openProfileDialog(ev)
      {
        $mdDialog.show({
          controller         : 'ProfileDialogController',
          controllerAs       : 'vm',
          templateUrl        : 'app/main/pages/profile/dialogs/profile/contact-dialog.html',
          parent             : angular.element($document.find('#profile')),
          targetEvent        : ev,
          clickOutsideToClose: true,
          locals             : {
            User    : vm.about
          }
        })
          .then(function(user){
            vm.about = user;
          },
          function(err){
            console.log(err);
          });
      }

      function openContactInfoDialog(ev){
        $mdDialog.show({
          controller         : 'ProfileDialogController',
          controllerAs       : 'vm',
          templateUrl        : 'app/main/pages/profile/dialogs/profile/contact-dialog.html',
          parent             : angular.element($document.find('#profile')),
          targetEvent        : ev,
          clickOutsideToClose: true,
          locals             : {
            User    : vm.about
          }
        })
          .then(function(user){
              vm.about = user;
            },
            function(err){
              console.log(err);
            });
      }
        //////////
    }

})();
