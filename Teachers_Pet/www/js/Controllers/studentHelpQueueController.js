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
        $scope.visibleQuestion = 0; // TODO: make so YOUR question is the one that is expanded upon first opening the view...
        $scope.Qs = firebaseDataService.getQuestions($scope.room.$id);
        $scope.ownQuestionVisible = true;
        $scope.ownQuestionIndex = -1;

        setTimeout(function() {
            var i = 0;
            for(var quest in $scope.Qs) {
                var key = $scope.Qs.$keyAt(i);
                var q = $scope.Qs.$getRecord(key);
                if (q.studentID == $scope.studentID){
                    $scope.visibleQuestion = i;
                    break;
                }
                i++;
            }
        }, 0);

        /*
         * When a header is clicked, toggle the visibility of the body
         */
        $scope.expandQuestion = function(index) {
                    var i = 0;
            for(var quest in $scope.Qs) {
                var key = $scope.Qs.$keyAt(i);
                var q = $scope.Qs.$getRecord(key);
                if (q.studentID == $scope.studentID){
                    $scope.visibleQuestion = i;
                }
                i++;
            }
            if($scope.visibleQuestion == index) {
                $scope.visibleQuestion = -1;//all questions are collapsed now
                // if(index == $scope.ownQuestionIndex){
                //     $scope.ownQuestionVisible = false;
                // }
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