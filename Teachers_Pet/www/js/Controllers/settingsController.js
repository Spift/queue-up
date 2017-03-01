(function() {
    'use strict';

    angular
        .module('settingsController', [])
        .controller('settingsController', settingsController);

    function settingsController($scope, $stateParams, $state) {
    	console.log('entry page controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}
    }


})();