(function() {
    'use strict';

    angular
        .module('firebaseDataService', [])
        .factory('firebaseDataService', firebaseDataService);

    /*
     * Fetch (mainly room?) Data from Firebase DB.
     * TODO: make a function in which the data is returned as a firebaseObject so we can have the live update feature which is needed for the question list
     * ***********************


     just return firebaseObject(ref) in resolution...
     

     */
    function firebaseDataService($firebaseObject, $firebaseArray, $ionicLoading) {
        /*
         * Fetch a room listed in the Rooms database.
         */
        function getRoom(roomCode) {
            //TODO: add some logic for distinguishing between room codes and ADMIN codes.
            //Maybe if we have the length of the two codes be different
            //that would be a good way of easily knowing one from the other...
            //var roomRef = firebase.database().ref("Rooms/" + roomCode);
            //var room = $firebaseArray(roomRef);
            //return room;
            var ref = firebase.database().ref("Rooms/" + roomCode);
            var room = $firebaseObject(ref);
                    
            return room;
        }
        /*
         * Fetch a room listed in the Rooms database. THIS IS NOT USED:.....:::::
         */
        function getRoomOLD(roomCode) {
            var ref = firebase.database().ref("Rooms/" + roomCode);
            //var people = $firebaseArray(peopleRef);
            var promise = ref.once('value');
            return promise;
        }
        /*
         * Available methods that the service should offer to the controller must be listed here:
         */
        return {
            getRoom : getRoom,
        }
    }

})();
