(function() {
    'use strict';

    angular
        .module('tabController', [])
        .controller('tabController', tabController);

    function tabController($scope, $stateParams, $state, $location) {
        this.cheese = 2;
        this.isActive = function(viewLocation) {
            console.log("It s working tho");
            return viewLocation === $location.path();
        };
    }
})();