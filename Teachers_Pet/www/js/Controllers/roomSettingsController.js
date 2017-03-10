(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state, $ionicNavBarDelegate, roomDataService, firebaseDataService) {
    	console.log('Room settings controller fired');
        $scope.room = roomDataService.getRoom();
        $scope.nothingHasChanged = true; //bool for keeping track of whether the room objects data differs from what is in the input fields. If it differs we un-gray the refresh button.

        $scope.formData = {
            roomName : $scope.room.title,
            description : $scope.room.description,
            subjects : $scope.room.Categories
        };
        /*
         *  Watch for ANY changes to the form, and make refresh clickable if change has occur(r)ed
         */
        $scope.$watch('formData', function() {
            console.log("somethingHasChanged");
            if(somethingHasChanged()) {
                $scope.nothingHasChanged = false;
            }else{
                $scope.nothingHasChanged = true;
            }

        }, true);
        /*
         * runs through all input forms and compares whether they match the room data. if not the refresh button should be made clickable
         */
        function somethingHasChanged() {
            return ($scope.formData.roomName != $scope.room.title ||
                                          $scope.formData.description != $scope.room.description ||
                                          $scope.formData.subjects != $scope.room.Categories);
        }
        /*
         * write what is in the input fields to the room object, i.e. save it to the database for all to see and enjoy.
         */
        $scope.applyChanges = function() {
            var changes = {'title' : $scope.formData.roomName,
                           'description' : $scope.formData.description,
                           'Categories' : $scope.formData.subjects};

            firebaseDataService.updateRoom($scope.room.$id, changes);
            /*
            $scope.room.title = $scope.formData.roomName;
            $scope.room.description = $scope.formData.description;
            $scope.room.Categories = $scope.formData.subjects;
            */
            console.log("changes added");
        }



        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();