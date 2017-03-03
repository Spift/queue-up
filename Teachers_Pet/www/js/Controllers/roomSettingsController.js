(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Room settings controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}

        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();