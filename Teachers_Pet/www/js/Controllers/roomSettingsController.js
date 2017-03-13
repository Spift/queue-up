(function() {
    'use strict';

    angular
        .module('roomSettingsController', [])
        .controller('roomSettingsController', roomSettingsController);

    function roomSettingsController($scope, $stateParams, colorService, $state, $ionicNavBarDelegate, roomDataService, firebaseDataService) {
    	console.log('Room settings controller fired');
        $scope.room = roomDataService.getRoom();
        $scope.nothingHasChanged = true; //bool for keeping track of whether the room objects data differs from what is in the input fields. If it differs we un-gray the refresh button.
        $scope.subjects = [];
        setSubjects();
        $scope.formData = {
            roomName : $scope.room.title,
            description : $scope.room.description,
            subject : ""
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
            console.log(compareSubjects());
            return ($scope.formData.roomName != $scope.room.title ||
                    $scope.formData.description != $scope.room.description ||
                    !compareSubjects());
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
            $scope.nothingHasChanged = true;
            //setSubjects();
            console.log("changes added");
        }
        /*
         * Add a subject to the subject list when clicking the PLUS button
         */
        $scope.addSubject = function() {
            console.log("addSubject fired", $scope.formData.subject.length);
            if($scope.formData.subject != "") { // for some reason this fires twice when the plus button is clicked so this check is necessary...
                $scope.subjects.push($scope.formData.subject);
                $scope.formData.subject = "";
            }
        }   
        /*
         * Remove a subject from the subject list
         */
        $scope.removeSubject = function(index){
            console.log("removeSubject fired");
            $scope.subjects.splice(index, 1);
            //$scope.nothingHasChanged = false;
            $scope.formData.subject = " ";//***VERY HACKY*** provoke the watch function to trigger thus enabling the refresh button
        }
        /*
         * get a color based on subject string
         */
        $scope.getSubjectColor = function(subject, desaturation) {
            var color = colorService.getColorFromString(subject, desaturation);
            return color;
        }
        /*
         * Fill the subjects array "manually" or else firebase will keep it updated live which makes it impossible to check for changes....
         */
        function setSubjects() {
            for(var i = 0; i < $scope.room.Categories.length; i++) {
                $scope.subjects.push($scope.room.Categories[i]);
            }
        }
        /*
         * Compare subjects array with firebase categories array "manually" as they are not the same type
         */
        function compareSubjects() {
            if($scope.room.Categories.length != $scope.subjects.length) {
                return false;
            }
            for(var i = 0; i < $scope.room.Categories.length; i++) {
                if($scope.subjects[i] != $scope.room.Categories[i]) {
                    return false;
                }
            }
            return true;
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Room Settings');
        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }
})();