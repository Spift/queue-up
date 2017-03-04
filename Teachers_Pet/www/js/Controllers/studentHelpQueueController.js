(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate) {
    	console.log('student page controller fired');
    	
        $scope.room = roomDataService.getRoom();
        console.log($scope.room);

        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();