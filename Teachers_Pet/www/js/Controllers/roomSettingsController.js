(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state) {
    	console.log('entry page controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}
    }


})();