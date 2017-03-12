(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, roomDataService, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Teacher help queue controller fired');
        $scope.room = roomDataService.getRoom();
    	
        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();