(function() {
    'use strict';

    angular
        .module('getHelpController', [])
        .controller('getHelpController', getHelpController);

    function getHelpController($scope, $stateParams, $ionicPopup, $state, constantsService, $ionicNavBarDelegate, roomDataService, firebaseDataService, localStorageService) {
    	console.log('get help controller fired');
    	$scope.Constants = constantsService.getConstants();
        $scope.formData = {};
        $scope.student = localStorageService.getName();
        $scope.room = roomDataService.getRoom();
        $scope.questions = roomDataService.getQuestions();
        $scope.studentID = localStorageService.getStudentID();

        /* Checkign if the user already has a questions */
        console.log("Ostemad: " + $scope.room.Categories);
        var i = 0;
            for(i = 0; i < $scope.questions.length; i++) {
                var key = $scope.questions.$keyAt(i);
                var q = $scope.questions.$getRecord(key);
                if(q.studentID == $scope.studentID) {
                  i = -1;
                  break;
                }
            }
            if (i == -1){
                showAlertPopup();
                console.log("YOU ALREADY HAVE QUESTION YOU GREEDY BEASTASRD");
            }

        /*
         * Confirm that you want to delete your question POP UP dialog.
         */
        function showAlertPopup() {
           var alertPopup = $ionicPopup.alert({
             title: 'Already in queue',
             template: 'You can only have 1 question at a time'
           });
           alertPopup.then(function(res) {
                $state.go('studentHelpQueue');
           });
        };
        /*
         * Submit a question with the data from the form in the view
         */
        $scope.submitQuestion = function() {
            var question = {
                            'body': $scope.formData.body,
                            'category': $scope.formData.category,
                            'studentID': localStorageService.getStudentID(),
                            'student': localStorageService.getName()
                            };
            console.log(question);
            firebaseDataService.addQuestion($scope.room.$id, question);
            $state.go("studentHelpQueue");
        }
        /*
         * Close the preview if the user decides to start over with the authoring of their question
         */
        $scope.closePreview = function(formToClear) {
            $scope.formData = {};
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Get Help');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();