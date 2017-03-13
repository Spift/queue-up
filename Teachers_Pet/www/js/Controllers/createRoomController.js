(function() {
    'use strict';

    angular
        .module('createRoomController', [])
        .controller('createRoomController', createRoomController);

    function createRoomController($scope, colorService, codeGeneratorService, firebaseDataService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory) {
    	console.log('create room controller fired');

        $scope.formData = {};
        $scope.formData.subjects = [];
        $scope.room = roomDataService.getRoom();
        $scope.loadingRoomData = false; //show a loading spinner in the button while we get the newly created room from the database...
        /*
         * Add a room with the data from the form in the view
         */
        $scope.createRoom = function() {
            $scope.loadingRoomData = true;
            var room = {'Categories': $scope.formData.subjects,
                        'Questions': {},
                        'admin_code': codeGeneratorService.generateCode(6),
                        'code': codeGeneratorService.generateCode(5),
                        'description': $scope.formData.description,
                        'no_of_admins': 1,
                        'title': $scope.formData.roomName
                        };
            firebaseDataService.addRoom(room); // push to firebase
            findRoomInDatabase(room.code);//Not very clear but this call will also move to teacherqueueView.
        }
        /*
         * Find newly created room in firebaseDB and store in roomDataService for later use. And go to next view...
         * This is almost identical to function in JoinRoomControlller. Maybe move to service somehow??
         */
        function findRoomInDatabase(roomCode) {
            $scope.room = firebaseDataService.getRoom(roomCode);
            $scope.room.$loaded()
            .then(function() {
                //data is now available!
                $scope.loadingRoomData = false;
                if($scope.room.$value !== null) { // make sure a room with given code actually exists.
                    roomDataService.setRoom($scope.room); // store the room data in  roomDataService, so it can be accessed later by the queue view.
                    $state.go("teacherHelpQueue");
                }else{
                    // TODO: UI Error here!!!!
                    console.log("no such room :(");
                }
            })
            .catch(function (err) {
                // This is where errors land. We should show an UI error here as well
                console.log('joinRoomController.findRoomInDatabase() Error', err.code);
            });
        }
        /*
         * Add a subject to the subject list
         */
        $scope.addSubject = function(){
            $scope.formData.subjects.push($scope.formData.subject);
            setTimeout(function() {$scope.formData.subject='';
            }, 0);
        }

        /* Check if subject field is valid NOT OPTIMAL */
        $scope.checkIfValid = function(input){
            var inputValLen = document.getElementById(input).value.length;
            return(inputValLen < 2 || inputValLen > 24);
        }

        /* Remove a subject from the subject list */
        $scope.removeSubject = function(index){
            $scope.formData.subjects.splice(index, 1);
        }
        /*
         * get a color based on subject string
         */
        $scope.getSubjectColor = function(subject) {
            var color = colorService.getColorFromString(subject);
            return color;
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Create Room');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }
})();