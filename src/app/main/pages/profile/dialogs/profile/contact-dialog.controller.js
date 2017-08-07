(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ContactDialogController', ContactDialogController);

    /** @ngInject */
    function ContactDialogController($mdDialog, User, profileService, msUtils, api)
    {
        var vm = this;

        // Data
        vm.title = 'Edit Profile';
        vm.user = User;

        // Methods
        vm.saveProfile = saveProfile;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        /**
         * Save contact
         */
        function saveContact()
        {
            profileService.saveProfile(vm.user._id, vm.user).then(function(res){
              closeDialog();
            });
        }

        /**
         * Delete Contact Confirm Dialog
         */
        function deleteContactConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the contact?')
                .htmlContent('<b>' + vm.contact.name + ' ' + vm.contact.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {
                api.userDetail.delete({id:vm.contact._id}, function(res){
                  vm.contacts.splice(vm.contacts.indexOf(Contact), 1);
                })
            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

    }
})();
