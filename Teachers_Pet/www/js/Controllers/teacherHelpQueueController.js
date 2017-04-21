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
        $scope.categoryCounter = [];
        //$scope.Qs = roomDataService.getQuestions($scope.room.$id);
        $scope.popularCategoryName = "";
        $scope.popularCategoryNumber = 0;
        $scope.expandedCurrentQuestion = true; // expand the Currently Being Helped question box at the top of the queue

        for(var i = 0; i < $scope.room.Categories.length; i++){
            $scope.categoryCounter.push(0);
        }
        updatePopularCategory();

        /* Function to keep track of number of students that need help with categories */
        function updatePopularCategory(){

          for(var i = 0; i < $scope.room.Categories.length; i++){
            $scope.categoryCounter[i] = 0;
          }
          for(var i = 0; i < $scope.questions.length; i++){
            var key = $scope.questions.$keyAt(i);
            var q = $scope.questions.$getRecord(key);
            var index = $scope.room.Categories.indexOf(q.category);
            $scope.categoryCounter[index] += 1;
          }
          console.log("Number of categories: " + $scope.categoryCounter);
          console.log("Max: " + Math.max.apply(Math, $scope.categoryCounter));

          var indexOfPopularCat = $scope.categoryCounter.indexOf(Math.max.apply(Math, $scope.categoryCounter));
          $scope.popularCategoryName = $scope.room.Categories[indexOfPopularCat];
          $scope.popularCategoryNumber = Math.max.apply(Math, $scope.categoryCounter);
        }

        $scope.questions.$watch(function(){
          updatePopularCategory();
        })

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
