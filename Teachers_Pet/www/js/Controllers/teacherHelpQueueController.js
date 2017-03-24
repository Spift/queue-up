(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, colorService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, constantsService) {
    	console.log('Teacher help queue controller fired');
        $scope.Constants = constantsService.getConstants();
        $scope.room = roomDataService.getRoom();
        $scope.visibleQuestion = 0;
        //var hej = $scope.room.$ref().child('Questions').size;
        //console.log("HEr er e tføl: ", hej);
        /*
         * When a header is clicked, toggle the visibility of the body
         */
        $scope.expandQuestion = function(index) {
            if($scope.visibleQuestion == index) {
                $scope.visibleQuestion = -1;    //all questions are collapsed now
            }else{
                $scope.visibleQuestion = index;
            }
        }
        /*
         * get a color based on subject string
         */
        $scope.getSubjectColor = function(subject, desaturation) {
            var color = colorService.getColorFromString(subject, desaturation);
            return color;
        }
        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();