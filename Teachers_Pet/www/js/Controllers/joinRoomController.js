(function() {
    'use strict';

    angular
        .module('joinRoomController', [])
        .controller('joinRoomController', joinRoomController);

    function joinRoomController($scope, $stateParams, $state, $firebaseObject, $firebaseArray, firebaseDataService, $ionicLoading) {
    	console.log('entry page controller fired');
        $scope.validRoomData = false; // show/hide room info box
        $scope.formData = {};
        /*
         * submit pressed. The promise resolution should be moved to the service which should return the data in a firebaseObject. Will do later
         */
        $scope.submitPressed = function(roomCode) {
            showLoadingDialog();
            //data promise resolution
            firebaseDataService.getRoom(roomCode)
            .then(function (result) {
                // This only happens after the data has been fetched
                if(result.val() == null) {//invalid room code!!!
                    console.log('No room with that code was found in the Database...')
                }else{
                    $scope.room = result.val();
                    $scope.validRoomData = true; // will make room info appear
                }
                hideLoadingDialog();
                console.log(result.val());
            })
            .catch(function (err) {
                // This is where errors land
                hideLoadingDialog();
                console.log('joinRoomController.submitPressed() Error', err.code);
            });
        }
        /*
         * Join Room button was pressed, so goto student help queue. Or admin queue if admin code was entered
         */
        $scope.joinRoomPressed = function(formToClear) {
            $scope.validRoomData = false;
            $scope.formData = {};
            $state.go("studentHelpQueue");
        };
        /*
         * Close room info card and reset input field 
         */
        $scope.closeCard = function(formToClear) {
            console.log("close card pressed");
            $scope.validRoomData = false;
            $scope.formData = {};
            formToClear.$setPristine();
            formToClear.$setUntouched();
        };
        /*
         * show the loading dialog
         */
        function showLoadingDialog() {
            $ionicLoading.show({
              template: '<p>Fetching Stuff...</p><ion-spinner></ion-spinner>',
            })
            .then(function(){
               console.log("The loading indicator is now displayed");
            });
        };
        /*
         * show the loading dialog
         */
        function hideLoadingDialog(){
            $ionicLoading.hide().then(function(){
               console.log("The loading indicator is now hidden");
            });
        };
    }


})();