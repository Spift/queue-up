(function() {
    'use strict';

    angular
        .module('firebaseDataService', [])
        .factory('firebaseDataService', firebaseDataService);

    /*
     * Fetch (mainly room?) Data from Firebase DB.
     * TODO: make a function in which the data is returned as a firebaseObject so we can have the live update feature which is needed for the question list
     */
    function firebaseDataService($firebaseObject, $firebaseArray, $ionicLoading) {
        /*
         * Fetch a room listed in the Rooms database.
         */
        function getRoom(roomCode) {
            var ref = firebase.database().ref("Rooms/" + roomCode);
            //var people = $firebaseArray(peopleRef);
            var promise = ref.once('value');
            return promise;

            //TODO: add some logic for distinguishing between room codes and ADMIN codes.
            //Maybe if we have the length of the two codes be different
            //that would be a good way of easily knowing one from the other...
            //var roomRef = firebase.database().ref("Rooms/" + roomCode);
            //var room = $firebaseArray(roomRef);
            //return room;
        }
        /*
         * show the loading dialog
         */
        function showLoadingDialog() {
            $ionicLoading.show({
              template: '<p>Fetching Stuff...</p><ion-spinner></ion-spinner>'
            })
            .then(function(){
               console.log("The loading indicator is now displayed");
            });
        };
        /*
         * hide the loading dialog
         */
        function hideLoadingDialog(){
            $ionicLoading.hide().then(function(){
               console.log("The loading indicator is now hidden");
            });
        };

        /*
         * Available methods that the service should offer to the controller must be listed here:
         */
        return {
            getRoom : getRoom,
        }
    }

})();
