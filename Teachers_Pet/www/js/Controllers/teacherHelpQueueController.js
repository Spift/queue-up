(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, colorService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, constantsService, $ionicScrollDelegate, $ionicPosition) {
    	console.log('Teacher help queue controller fired');
        $scope.Constants = constantsService.getConstants();
        $scope.room = roomDataService.getRoom();
        $scope.visibleQuestion = 0;
        //$scope.Qs = roomDataService.getQuestions($scope.room.$id);

        /*
         * When a header is clicked, toggle the visibility of the body
         */
        $scope.expandQuestion = function(index) {
          var count = Object.keys($scope.room.Questions).length - 1;
          //getQuestionFromIndex(index, $scope.Qs);
          if($scope.visibleQuestion == index) {
              $scope.visibleQuestion = -1;//all questions are collapsed now
          }
          else if(count == index) {
            $ionicScrollDelegate.$getByHandle('question-scroll').resize();
            $ionicScrollDelegate.$getByHandle('question-scroll').scrollTo(0, 1000, [true]);
            $scope.visibleQuestion = index;
          }
          else{
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
