(function() {
    'use strict';

    angular
        .module('settingsController', [])
        .controller('settingsController', settingsController);

    function settingsController($scope, $stateParams, $state, localStorageService, $ionicNavBarDelegate, constantsService, $ionicHistory) {
    	console.log('settings controller fired');
        $scope.Constants = constantsService.getConstants();
        $scope.formData = {nightMode : $scope.Constants.IN_NIGHT_MODE};
        $scope.nameHasNotChanged = false;
    	//Fetch the name given by the user and put it in the "update name" input field
        $scope.formData.name = localStorageService.getName();
        //find out which view we came from and show the corresponding tab bar
        //$scope.tabBarTemplate = "templates/studentTab.html";
        if($ionicHistory.backView().stateName == "studentHelpQueue" || $ionicHistory.backView().stateName == "getHelp") {
            $scope.tabBarTemplate = "templates/studentTab.html";
            console.log("showing the tab bar with template: ", $scope.tabBarTemplate);
        }else if($ionicHistory.backView().stateName == "teacherHelpQueue" || $ionicHistory.backView().stateName == "roomSettings") {
            $scope.tabBarTemplate = "templates/teacherTab.html";
            console.log("showing the tab bar with template: ", $scope.tabBarTemplate);
        }

        //As the input changes, check that it is indeed different from the name thats already stored...
        // this is to make sure the user cant press refresh if they haven't given a different name
        $scope.$watch('formData.name', function() {
            if($scope.formData.name == localStorageService.getName()) {
                console.log("Name has not changed");
                $scope.nameHasNotChanged = true;
            }else{
                console.log("Name is now different so allow the user to press refresh");
                $scope.nameHasNotChanged = false;
            }
        }, true);
        // watch for the night mode toggle to switch
        // yes that is what goes on below here
        $scope.$watch('formData.nightMode', function() {
            if($scope.formData.nightMode) {
                console.log("nightMode off");
                $scope.Constants.IN_NIGHT_MODE = true;               
            }else{
                console.log("nightMode on");
                $scope.Constants.IN_NIGHT_MODE = false;
            }
            constantsService.setConstants($scope.Constants); 
        }, true);
        /*
         * Refresh Name Button press. Saves the input content to localstorage
         */
        $scope.refreshNamePressed = function() {
            console.log("New name was saved!")
            localStorageService.setName($scope.formData.name);
            $scope.nameHasNotChanged = true;
        }


        // Update the title of the view
        $ionicNavBarDelegate.title('Settings');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }
})();