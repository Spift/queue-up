(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, colorService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, constantsService, $ionicScrollDelegate, $ionicPosition) {
    	console.log('Teacher help queue controller fired');
        $scope.Constants = constantsService.getConstants();
        $scope.room = roomDataService.getRoom();
        $scope.questions = roomDataService.getQuestions();
        $scope.currentlyBeingHelped = -1; // the question object is -1 if no one is currently being helped
        $scope.visibleQuestion = 0;
        //$scope.Qs = roomDataService.getQuestions($scope.room.$id);

        $scope.expandedCurrentQuestion = true; // expand the Currently Being Helped question box at the top of the queue
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
         * Put question to the top of the queue and mark it as currently being solved
         */
        $scope.beginHelping = function(question) {
            $scope.currentlyBeingHelped = question;
            $scope.visibleQuestion = -1; // collapse all other questions, expand this top question
        }
        /*
         * Put question to the top of the queue and mark it as currently being solved
         */
        $scope.doneHelping = function(question) {
            $scope.currentlyBeingHelped = -1;
            $scope.visibleQuestion = -1;
        }
        /*
         * You close the currently helping because you regret starting to help that person
         */
        $scope.regretHelping = function(question) {
            $scope.currentlyBeingHelped = -1;
            $scope.visibleQuestion = -1;
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
