(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $firebaseArray, constantsService, $firebaseObject, $ionicPopup, $location, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate, localStorageService) {
        $scope.Constants = constantsService.getConstants();
        $scope.studentID = localStorageService.getStudentID();
        $scope.room = roomDataService.getRoom();
        $scope.Qs = roomDataService.getQuestions();
        $scope.visibleQuestion = -1;
        // $scope.ownQuestionVisible = true;
        // $scope.ownQuestionIndex = -1;

        var i = 0;
        for(var i = 0; i < $scope.Qs.length; i++) {
            var key = $scope.Qs.$keyAt(i);
            var q = $scope.Qs.$getRecord(key);
            console.log("Question id: " + q.studentID);
            console.log("Scope id: " + $scope.studentID);
            if (q.studentID == $scope.studentID){
                $scope.visibleQuestion = i;
                break;
            }
        }

        /*
         * When a header is clicked, toggle the visibility of the body
         */
        $scope.expandQuestion = function(index) {
            if($scope.visibleQuestion == index) {
                $scope.visibleQuestion = -1;//all questions are collapsed now
            }else{
                $scope.visibleQuestion = index;
            }
        }
        /*
         * delete my question (close button only appears on questions YOU posted, so should only be available for those)
         */
        $scope.deleteMyQuestion = function(idx) {
            //virkelig hacket og grimt men jeg kunne ikke få ID/Key valuen for det på-klikkede question på nogen anden måde. Jeg har prøvet alt. sdfsdfsdf
            var i = 0;
            for(var qid in $scope.room.Questions) {
                if(idx == i) {
                    showConfirmDialog(qid);
                    break;
                }
                i++;
            }
        }
        /*
         * Confirm that you want to delete your question POP UP dialog.
         */
         function showConfirmDialog(questionID) {
           var confirmPopup = $ionicPopup.confirm({
             title: 'Delete Question',
             template: 'Are you sure you want to delete your question?'
           });

           confirmPopup.then(function(res) {
             if(res) {
               console.log('You are sure. deleting question...');
               firebaseDataService.removeQuestion($scope.room.$id, questionID);
             } else {
               console.log('You cancelled');
             }
           });
        };
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