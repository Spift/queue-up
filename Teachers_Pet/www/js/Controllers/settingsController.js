(function() {
    'use strict';

    angular
        .module('settingsController', [])
        .controller('settingsController', settingsController);

    function settingsController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Settings controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}

        // Update the title of the view
        $ionicNavBarDelegate.title('Settings');

        //Show back button
         $ionicNavBarDelegate.showBackButton(true);
    }
})();