(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .controller('OrdersController', OrdersController);

    /** @ngInject */
    function OrdersController($state, Orders, StudentUsers, ParentUsers)
    {
        var parentUsers = [];
        var studentUsers = [];

        var vm = this;

        // Data
        vm.orders = Orders;
        vm.parentUsers = Orders;
      console.log(parentUsers);
        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the status column
                    targets: 3,
                    render : function (data, type, row, meta)
                    {
                        // Get last order status
                        var orderStatus = vm.orders[meta.row].status[0];

                        if ( type === 'display' )
                        {
                            return '<span class="status ' + orderStatus.color + '">' + orderStatus.name + '</span>';
                        }

                        if ( type === 'filter' )
                        {
                            return orderStatus.name;
                        }

                        return data;
                    }
                },
                {
                    // Target the actions column
                    targets           : 5,
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
        vm.gotoOrderDetail = gotoOrderDetail;

        //////////

        /**
         * Go to product detail
         *
         * @param id
         */
        function gotoOrderDetail(id, parentObject)
        {
            console.log("Order ID: " + id);
            localStorage.setItem("parentObject", JSON.stringify(parentObject));
            $state.go('app.e-commerce.orders.detail', {id: id});
        }
    }
})();
