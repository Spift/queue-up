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

        /* Highlighting tabbar appropriately */
        $scope.tabClicked = function(element, o_icon1, o_icon2, o_icon3){
            document.getElementById(element).style.opacity = 1;
            document.getElementById(o_icon1).style.opacity = 0.3;
            document.getElementById(o_icon2).style.opacity = 0.3;
            document.getElementById(o_icon3).style.opacity = 0.3;
            console.log(element +" highlighted!");
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Get Help');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();