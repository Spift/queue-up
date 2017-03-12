(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, $state, $ionicNavBarDelegate, roomDataService, firebaseDataService) {
    	console.log('Room settings controller fired');
        $scope.room = roomDataService.getRoom();
        $scope.nothingHasChanged = true; //bool for keeping track of whether the room objects data differs from what is in the input fields. If it differs we un-gray the refresh button.
        $scope.subjects = $scope.room.Categories;
        //$scope.formData.subjects = [];
        $scope.formData = {
            roomName : $scope.room.title,
            description : $scope.room.description
            //subjects : $scope.room.Categories
        };
        /*
         *  Watch for ANY changes to the form, and make refresh clickable if change has occur(r)ed
         */
        $scope.$watch('formData', function() {
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
            console.log("somethingHasChanged" + $scope.subjects);
            console.log($scope.room.Categories);
            return ($scope.formData.roomName != $scope.room.title ||
                                          $scope.formData.description != $scope.room.description ||
                                          $scope.subjects != $scope.room.Categories);
        }
        /*
         * write what is in the input fields to the room object, i.e. save it to the database for all to see and enjoy.
         */
        $scope.applyChanges = function() {
            console.log("applyChanges fired");
            var changes = {'title' : $scope.formData.roomName,
                           'description' : $scope.formData.description,
                           'Categories' : $scope.subjects};

            firebaseDataService.updateRoom($scope.room.$id, changes);
            
            $scope.room.title = $scope.formData.roomName;
            $scope.room.description = $scope.formData.description;
            $scope.room.Categories = $scope.subjects;
            $scope.nothingHasChanged = true;
            console.log("changes added");
        }
        /*
         * Add a subject to the subject list when clicking the PLUS button
         */
        $scope.addSubject = function() {
            console.log("addSubject fired");
            $scope.subjects.push($scope.formData.subject);
            $scope.formData = {};
            $scope.formData = {
                roomName : $scope.room.title,
                description : $scope.room.description
                /*subjects : $scope.room.Categories*/
            };

            //formToClear.$setPristine();
            //formToClear.$setUntouched();
        }   
        /*
         * Remove a subject from the subject list
         */
        $scope.removeSubject = function(index){
            console.log("removeSubject fired");
            $scope.subjects.splice(index, 1);
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();