(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);

    function studentHelpQueueController($scope, $stateParams, $state) {
    	console.log('entry page controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}
    }


})();