(function ()
{
  'use strict';

  angular
    .module('app.manager')
    .controller('LocationDetailController', LocationDetailController);

  /** @ngInject */
  function LocationDetailController($state, Location, managerService)
  {
    console.log("location detail controller");
    var vm = this;

    // Data
    vm.location = Location;
    vm.location.hours.close = new Date(vm.location.hours.close);
    vm.location.hours.open = new Date(vm.location.hours.open);
    console.log(Location);
    // Methods
/*    vm.gotoLocations = gotoLocations();
    vm.gotoSpacesDetail = gotoSpacesDetail;*/
    //vm.updateLocation = updateLocation;
    vm.saveLocation = saveLocation;

    //////////
    /**
     * Go to orders page
     */
    function gotoLocations()
    {
      $state.go('app.manager.locations');
    }

    /**
     * Go to product page
     * @param id
     */
    function gotoSpacesDetail(id)
    {
      $state.go('app.manager.spaces.detail', {id: id});
    }

    /**
     * Save product
     */
    function saveLocation()
    {
      // Since we have two-way binding in place, we don't really need
      // this function to update the locations array in the demo.
      // But in real world, you would need this function to trigger
      // an API call to update your database.
      if ( vm.location._id )
      {
        managerService.updateLocation(vm.location._id, vm.location);
      }
      else
      {
        managerService.createLocation(vm.location);
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

    /**
     * Update order status
     *
     * @param id
     */
    function updateStatus(id)
    {
      if ( !id )
      {
        return;
      }

      for ( var i = 0; i < vm.orderStatuses.length; i++ )
      {
        if ( vm.orderStatuses[i].id === parseInt(id) )
        {
          vm.order.status.unshift({
            id   : vm.orderStatuses[i].id,
            name : vm.orderStatuses[i].name,
            color: vm.orderStatuses[i].color,
            date : moment().format('YYYY/MM/DD HH:mm:ss')
          });

          break;
        }
      }
    }
  }
})();
