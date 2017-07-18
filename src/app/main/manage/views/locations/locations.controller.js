(function ()
{
  'use strict';

  angular
    .module('app.manage')
    .controller('LocationsController', LocationsController);

  /** @ngInject */
  function LocationsController($state, Locations)
  {
    var vm = this;

    // Data
    vm.locations = Locations;
    console.log("locations controller");

    vm.dtInstance = {};
    vm.dtOptions = {
      dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs  : [
        {
          // Target the actions column
          targets           : 0,
          responsivePriority: 1,
          filterable        : true,
          sortable          : false
        }
      ],
      initComplete: function ()
      {
        var api = this.api(),
          searchBox = angular.element('body').find('#e-commerce-locations-search');

        // Bind an external input as a table wide search box
        if ( searchBox.length > 0 )
        {
          searchBox.on('keyup', function (event)
          {
            api.search(event.target.value).draw();
          });
        }
      },
      pagingType  : 'simple',
      lengthMenu  : [10, 20, 30, 50, 100],
      pageLength  : 20,
      scrollY     : 'auto',
      responsive  : true
    };

    // Methods
    vm.goToLocationDetail = goToLocationDetail;

    //////////

    /**
     * Go to product detail
     *
     * @param id
     */
    function goToLocationDetail(id)
    {
      console.log("Locaiton ID: " + id);
      $state.go('app.manage.locations.detail', {id: id});
    }
  }
})();
