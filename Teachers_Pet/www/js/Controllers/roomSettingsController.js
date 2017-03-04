(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Room settings controller fired');
    	
        /* Highlighting tabbar appropriately */
        $scope.tabClicked = function(element, o_icon1, o_icon2){
            document.getElementById(element).style.opacity = 1;
            document.getElementById(o_icon1).style.opacity = 0.3;
            document.getElementById(o_icon2).style.opacity = 0.3;
            console.log(element +" highlighted!");
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();