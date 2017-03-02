(function() {
    'use strict';

    angular
        .module('joinRoomController', [])
        .controller('joinRoomController', joinRoomController);

    function joinRoomController($scope, $stateParams, $state, $firebaseObject, $firebaseArray, firebaseDataService) {
    	console.log('entry page controller fired');

        $scope.people = firebaseDataService.getPeople();
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}
    }


})();