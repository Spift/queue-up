(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate) {
    	console.log('student page controller fired');

        /* Highlighting tabbar appropriately */
        $scope.tabClicked = function(element, o_icon1, o_icon2, o_icon3){
            document.getElementById(element).style.opacity = 1;
            document.getElementById(o_icon1).style.opacity = 0.3;
            document.getElementById(o_icon2).style.opacity = 0.3;
            document.getElementById(o_icon3).style.opacity = 0.3;
            console.log(element +" highlighted!");
        }

        $scope.room = roomDataService.getRoom();
        console.log($scope.room);

        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();