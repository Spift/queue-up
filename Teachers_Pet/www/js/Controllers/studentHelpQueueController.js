(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $location, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate, localStorageService) {
        $scope.studentID = localStorageService.getStudentID();
        $scope.room = roomDataService.getRoom();

        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();