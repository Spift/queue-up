(function() {
    'use strict';

    angular
        .module('createRoomController', [])
        .controller('createRoomController', createRoomController);

    function createRoomController($scope, codeGeneratorService, firebaseDataService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory) {
    	console.log('create room controller fired');

        $scope.formData = {};
        $scope.formData.subjects = [];
        $scope.room = roomDataService.getRoom();

        /*
         * Add a room with the data from the form in the view
         */
        $scope.createRoom = function() {
            var room = {'Categories': $scope.formData.subjects,
                        'Questions': {},
                        'admin_code': codeGeneratorService.generateCode(6),
                        'code': codeGeneratorService.generateCode(5),
                        'description': $scope.formData.description,
                        'no_of_admins': 1,
                        'title': $scope.formData.roomName
                        };
            console.log(room);
            firebaseDataService.addRoom(room);
            roomDataService.setRoom(room);
            $state.go("teacherHelpQueue");
        }

        /* Add a subject to the subject list */
        $scope.addSubject = function(){
            console.log('added subject: ' + $scope.formData.subject);
            $scope.formData.subjects.push($scope.formData.subject);
        }
        // Update the title of the view
        $ionicNavBarDelegate.title('Create Room');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }
})();