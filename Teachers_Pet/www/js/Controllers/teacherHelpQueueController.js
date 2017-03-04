(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('Teacher help queue controller fired');
    	
        /* Highlighting tabbar appropriately */
        $scope.tabClicked = function(element, o_icon1, o_icon2){
            angular.element(document).ready(function(){
            document.getElementById(element).style.opacity = 1;
            document.getElementById(o_icon1).style.opacity = 0.3;
            document.getElementById(o_icon2).style.opacity = 0.3;})
            console.log(element +" highlighted!");
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Teacher Help Queue');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();