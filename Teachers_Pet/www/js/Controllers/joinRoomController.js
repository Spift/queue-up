(function() {
    'use strict';

    angular
        .module('joinRoomController', [])
        .controller('joinRoomController', joinRoomController);

    function joinRoomController($scope, $ionicNavBarDelegate, $stateParams, $state, $firebaseObject, $firebaseArray, firebaseDataService) {
    	console.log('Join room controller fired');

        $scope.people = firebaseDataService.getPeople();
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}
        // Update the title of the view
        $ionicNavBarDelegate.title('Join Room!');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }


})();