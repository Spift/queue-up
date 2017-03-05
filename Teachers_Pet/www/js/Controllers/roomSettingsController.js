(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Room settings controller fired');

        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();