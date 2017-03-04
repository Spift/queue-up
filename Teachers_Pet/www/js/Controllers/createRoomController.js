(function() {
    'use strict';

    angular
        .module('createRoomController', [])
        .controller('createRoomController', createRoomController);

    function createRoomController($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory) {
    	console.log('create room controller fired');

        // Update the title of the view
        $ionicNavBarDelegate.title('Create Room');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }


})();