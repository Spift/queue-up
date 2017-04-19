(function() {
    'use strict';

    angular
        .module('createRoomController', [])
        .controller('createRoomController', createRoomController);

    function createRoomController($scope, colorService,constantsService, codeGeneratorService, firebaseDataService, roomDataService, $stateParams, $state, $ionicNavBarDelegate, $ionicHistory) {
    	console.log('create room controller fired');
        $scope.Constants = constantsService.getConstants();
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
                        'admin_code': codeGeneratorService.generateCode(5),//i dont think this has to be 6 in length so i changed it.
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
            $scope.questions = firebaseDataService.getQuestions(roomCode.toLowerCase());
            
            $scope.room.$loaded()
            .then(function() {
                $scope.questions.$loaded()
                .then(function() {
                    //data is now available!
                    $scope.loadingRoomData = false;
                    if($scope.room.$value !== null) { // make sure a room with given code actually exists.
                        console.log("hejsa");
                        roomDataService.setRoom($scope.room); // store the room data in  roomDataService, so it can be accessed later by the queue view.
                        roomDataService.setQuestions($scope.questions);
                        $state.go("teacherHelpQueue");
                    }else{
                        // TODO: UI Error here!!!!
                        console.log("no such room :(");
                    }
                })
                .catch(function (err) {
                    // This is where errors land. We should show an UI error here as well
                    console.log('joinRoomController.findRoomInDatabase() Error', err.code);
                })
            })
            .catch(function (err) {
                // This is where errors land. We should show an UI error as well here
                console.log('joinRoomController.findRoomInDatabase() Error', err.code);
            });
        }
        /*
         * Add a subject to the subject list
         */

         $scope.addSubject = function(){
            if ($scope.formData.subject === ''){
                return;
            }
            $scope.formData.subjects.push($scope.formData.subject);
            $scope.formData.subject='';
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
        $scope.getSubjectColor = function(subject, desaturation) {
            var color = colorService.getColorFromString(subject, desaturation);
            return color;
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Create Room');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }
})();