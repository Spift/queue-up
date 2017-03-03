(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Teacher help queue controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}

        // Update the title of the view
        $ionicNavBarDelegate.title('Teacher Help Queue');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();