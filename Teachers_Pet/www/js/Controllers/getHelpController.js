(function() {
    'use strict';

    angular
        .module('getHelpController', [])
        .controller('getHelpController', getHelpController);

    function getHelpController($scope, $stateParams, $state, $ionicNavBarDelegate, roomDataService, firebaseDataService, localStorageService) {
    	console.log('get help controller fired');
    	$scope.formData = {}
        $scope.room = roomDataService.getRoom();
        /*
         * Submit a question with the data from the form in the view
         */

        $scope.submitQuestion = function() {
            var question = {'title': $scope.formData.title,
                            'body': $scope.formData.body,
                            'category': $scope.formData.category,
                            'student': localStorageService.getName()
                            };
            console.log(question);
            firebaseDataService.addQuestion($scope.room.$id, question);
            $state.go("studentHelpQueue");
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Get Help');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();