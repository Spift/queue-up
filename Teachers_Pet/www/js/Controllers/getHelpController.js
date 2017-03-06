(function() {
    'use strict';

    angular
        .module('getHelpController', [])
        .controller('getHelpController', getHelpController);

    function getHelpController($scope, $stateParams, $state, $ionicNavBarDelegate, roomDataService, firebaseDataService, localStorageService) {
    	console.log('get help controller fired');
    	$scope.formData = {}
        $scope.student = localStorageService.getName();
        $scope.room = roomDataService.getRoom();
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