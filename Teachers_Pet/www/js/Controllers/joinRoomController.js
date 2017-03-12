(function() {
    'use strict';

    angular
        .module('joinRoomController', [])
        .controller('joinRoomController', joinRoomController);

    function joinRoomController($scope, $stateParams, $state, $firebaseObject, $firebaseArray, firebaseDataService, $ionicLoading, $ionicNavBarDelegate, roomDataService) {
    	console.log('entry page controller fired');
        $scope.validRoomData = false; // show/hide room info preview
        $scope.showLoadingSpinner = false; // show/hide the loading thing
        $scope.showRoomNotFoundError = false;
        $scope.formData = {code: "fcuzn", adminCode : "dsfm1x"};
        $scope.joinAsAdmin = false;
        var roomCodeLength = 5; // the standard length of a room Code: if innput field text has this length, we automatically look in firebase for a room. no need for a button press
        /*
         * Every time the roomCode input field changes, if it has the right length, search firebase for a valid room
         */
        $scope.$watch('formData', function() {
            if($scope.formData.code != undefined && $scope.formData.code.length == roomCodeLength) {
                findRoomInDatabase($scope.formData.code);
            }else{
                $scope.validRoomData = false;
                $scope.showRoomNotFoundError = false;
            }
        }, true);
        /*
         * Join Room button was pressed, so goto student help queue. Or admin queue if admin code was also entered
         */
        $scope.joinRoomPressed = function(formToClear) {
            $scope.validRoomData = false;
            $scope.showRoomNotFoundError = false;
            $scope.showLoadingSpinner = false;
            $scope.formData = {};
            if($scope.joinAsAdmin) {
                $scope.joinAsAdmin = false;
                $state.go("teacherHelpQueue");
            }else{
                $scope.joinAsAdmin = false;
                $state.go("studentHelpQueue");
            }
        };
        /*
         * Close room info preview and reset input field 
         */
        $scope.closePreview = function(formToClear) {
            console.log("close preview pressed");
            $scope.validRoomData = false;
            $scope.formData = {};
            formToClear.$setPristine();
            formToClear.$setUntouched();
        };
        /*
         * Look up room in firebaseDB
         */
        function findRoomInDatabase(roomCode) {
            $scope.showLoadingSpinner = true;
            $scope.room = firebaseDataService.getRoom(roomCode);
            $scope.room.$loaded()
            .then(function() {
                //data is now available!
                $scope.showLoadingSpinner = false;
                if($scope.room.$value !== null) { // make sure a room with given code actually exists.
                    roomDataService.setRoom($scope.room); // store the room data in  roomDataService, so it can be accessed later by the queue view.
                    $scope.validRoomData = true; // will make room preview appear
                }else{
                    $scope.showRoomNotFoundError = true;
                    console.log("no such room :(");
                }
            })
            .catch(function (err) {
                // This is where errors land. We should show an UI error as well here
                console.log('joinRoomController.findRoomInDatabase() Error', err.code);
            });
        }
        /*
         * get the text that appears on the join button (teacher or student);
         */
        $scope.getJoinButtonText = function() {
            if($scope.joinAsAdmin) {
                return "Join as Teacher";
            }
            return "Join this Room";
        }
        /*
         * Toggle joinAsAdmintt
         */
        $scope.toggleAdmin = function() {
            if($scope.joinAsAdmin) {
                $scope.joinAsAdmin = false;
            }else{
                $scope.joinAsAdmin = true;
            }
        }

        // Update the title of the view
        $ionicNavBarDelegate.title('Join Room!');
        //Show back button
        $ionicNavBarDelegate.showBackButton(true);
    }
})();