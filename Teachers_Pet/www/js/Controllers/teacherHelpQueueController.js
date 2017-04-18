(function() {
    'use strict';

    angular
        .module('teacherHelpQueueController', [])
        .controller('teacherHelpQueueController', teacherHelpQueueController);

    function teacherHelpQueueController($scope, colorService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, constantsService, $ionicScrollDelegate, $ionicPosition, firebaseDataService) {
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
          if($scope.visibleQuestion == index) {
            $scope.visibleQuestion = -1;//all questions are collapsed now
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
         * Delete question from the database
         */
        $scope.doneHelping = function(question) {
            $scope.currentlyBeingHelped = -1;
            $scope.visibleQuestion = -1;

            var i = 0;
            for(var i = 0; i < $scope.questions.length; i++) {
                var key = $scope.questions.$keyAt(i);
                var q = $scope.questions.$getRecord(key);
                if(q.studentID == question.studentID) {
                  console.log(key);
                  firebaseDataService.removeQuestion($scope.room.$id, key);
                  break;
                }
            }
            //console.log($scope.questions.$keyAt(question));

        }
        /*
         * You regret starting to help that person, and put them back in the queue
         */
        $scope.regretHelping = function() {
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
