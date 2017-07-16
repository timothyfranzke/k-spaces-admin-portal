(function ()
{
  'use strict';

  angular
    .module('app.manage',[])
    .controller('SpaceDetailController', SpaceDetailController);

  /** @ngInject */
  function SpaceDetailController($state, uiGmapGoogleMapApi, Space)
  {
    var vm = this;

    // Data
    vm.space = Space;
    vm.dtInstance = {};
    vm.dtOptions = {
      dom       : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      columnDefs: [
        {
          // Target the id column
          targets: 0,
          width  : '72px'
        },
        {
          // Target the image column
          targets   : 1,
          filterable: false,
          sortable  : false,
          width     : '80px'
        },
        {
          // Target the actions column
          targets           : 5,
          responsivePriority: 1,
          filterable        : false,
          sortable          : false
        }
      ],
      pagingType: 'simple',
      lengthMenu: [10, 20, 30, 50, 100],
      pageLength: 20,
      responsive: true
    };

    vm.newStatus = '';

    // Methods
    vm.gotoSpaces = gotoSpaces;
    vm.gotoProductDetail = gotoProductDetail;
    vm.updateStatus = updateStatus;


    /**
     * Go to orders page
     */
    function gotoSpaces()
    {
      $state.go('app.manage.spaces');
    }

    /**
     * Go to product page
     * @param id
     */
    function gotoProductDetail(id)
    {
      $state.go('app.e-commerce.products.detail', {id: id});
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
