(function() {
    'use strict';

    angular
        .module('settingsController', [])
        .controller('settingsController', settingsController);

    function settingsController($scope, $stateParams, $state, localStorageService) {
    	console.log('settings controller fired');
        $scope.formData = {};
        $scope.nameHasNotChanged = false;
    	//Fetch the name given by the user and put it in the "update name" input field
        $scope.formData.name = localStorageService.getName();

        //As the input changes, check that it is indeed different from the name thats already stored...
        // this is to make sure the user cant press refresh if they haven't given a different name
        $scope.$watch('formData', function() {
            if($scope.formData.name == localStorageService.getName()) {
                console.log("Name has not changed");
                $scope.nameHasNotChanged = true;
            }else{
                console.log("Name is now different so allow the user to press refresh");
                $scope.nameHasNotChanged = false;
            }
        }, true);

        /*
         * Refresh Name Button press. Saves the input content to localstorage
         */
        $scope.refreshNamePressed = function() {
            console.log("New name was saved!")
            localStorageService.setName($scope.formData.name);
            $scope.nameHasNotChanged = true;
        }
    }


})();