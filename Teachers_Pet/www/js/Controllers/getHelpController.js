(function() {
    'use strict';

    angular
        .module('getHelpController', [])
        .controller('getHelpController', getHelpController);

    function getHelpController($scope, $stateParams, $state) {
    	console.log('get help controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing");
    	}

        $scope.getHelpBody;
    }


})();