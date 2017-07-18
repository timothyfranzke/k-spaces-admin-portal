(function ()
{
  'use strict';

  angular
    .module('app.manage')
    .controller('SpacesController', SpacesController);

  /** @ngInject */
  function SpacesController($state, Spaces)
  {
    var vm = this;

    // Data
    vm.spaces = Spaces;
    console.log(vm.spaces);
    console.log(vm.spaces.length);
    console.log(vm.spaces[0].name);
    vm.dtInstance = {};
    vm.dtOptions = {
      dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs  : [
        {
          // Target the id column
          targets: 0,
          width  : '72px'
        },
        {
          // Target the actions column
          targets           : 1,
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
    vm.goToSpaceDetail = goToSpaceDetail;

    //////////

    /**
     * Go to product detail
     *
     * @param id
     */
    function goToSpaceDetail(id)
    {
      console.log("Space ID: " + id);
      $state.go('app.manage.spaces.detail', {id: id});
    }
  }
})();
