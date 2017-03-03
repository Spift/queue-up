(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);

    function studentHelpQueueController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Student controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}

        // Update the title of the view
        $ionicNavBarDelegate.title('Student Help Queue');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();