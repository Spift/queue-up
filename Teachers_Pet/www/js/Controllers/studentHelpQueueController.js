(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $location, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate, localStorageService) {
    	console.log('student page controller fired');
        $scope.studentID = localStorageService.getStudentID();
        $scope.room = roomDataService.getRoom();
        console.log($scope.room);
        console.log($scope.studentID);

        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();