(function ()
{
  'use strict';

  angular
    .module('app.manager')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($state, User, managerService, avatarGeneratorService)
  {
    console.log("location detail controller");
    var vm = this;

    // Data
    vm.user = User;
    vm.roles = ["parent","faculty","student"];
    var index = 0;

    // Methods
    /*    vm.gotoLocations = gotoLocations();
     vm.gotoSpacesDetail = gotoSpacesDetail;*/
    //vm.updateLocation = updateLocation;
    vm.saveUser = saveUser;
    vm.createAvatar = createAvatar;
    //////////

    /**
     * Save product
     */
    function saveUser()
    {
      // Since we have two-way binding in place, we don't really need
      // this function to update the locations array in the demo.
      // But in real world, you would need this function to trigger
      // an API call to update your database.
      if ( vm.user._id )
      {
        managerService.updateUser(vm.user._id, vm.user);
      }
      else
      {
        managerService.createUser(vm.user, vm.image);
      }

    }

    /**
     * Checks if the given form valid
     *
     * @param formName
     */
    function isFormValid(formName)
    {
      if ( $scope[formName] && $scope[formName].$valid )
      {
        return $scope[formName].$valid;
      }
    }

    function createAvatar(){
      avatarGeneratorService.avatarGenerator(function(image){
        vm.user.hasImage = true;
        avatarGeneratorService.resizeImage(image)
          .then(function(res){
            vm.image = res;
          })
      })
    }
  }
})();
