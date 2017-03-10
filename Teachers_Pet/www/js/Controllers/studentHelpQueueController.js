(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $ionicPopup, $location, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate, localStorageService) {
        $scope.studentID = localStorageService.getStudentID();
        $scope.room = roomDataService.getRoom();
        /*
         * delete my question (close button only appears on questions YOU posted, so should only be available for those)
         */
        $scope.deleteMyQuestion = function(idx) {
            //virkelig hacket og grimt men jeg kunne ikke få ID/Key valuen for det på-klikkede question på nogen anden måde. Jeg har prøvet alt. sdfsdfsdf
            var i = 0;
            var questionID = "placeholder"
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
        
        // Update the title of the view
        $ionicNavBarDelegate.title($scope.room.title);

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();