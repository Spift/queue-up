(function() {
    'use strict';

    angular
        .module('firebaseDataService', [])
        .factory('firebaseDataService', firebaseDataService);

    /*
     * read and write Data from Firebase DB.
     */
    function firebaseDataService($firebaseObject, $firebaseArray, $ionicLoading) {
        /*
         * Fetch a room listed in the Rooms database.
         */
        function getRoom(roomCode) {
            //TODO: add some logic for distinguishing between room codes and ADMIN codes.
            //Maybe if we have the length of the two codes be different
            //that would be a good way of easily knowing one from the other...
            var ref = firebase.database().ref("Rooms/" + roomCode);
            var room = $firebaseObject(ref);
                    
            return room;
        }
        /*
         * Add a question to a room.
         * it is assumed that the question is well-formed, maybe we should ceck that though......
         * //TODO catch errors here by promise resolution on push() call....
         */
        function addQuestion(roomCode, question) {
            var ref = firebase.database().ref("Rooms/" + roomCode + "/Questions");
            ref.push(question);
        }
        /*
         * Available methods that the service should offer to the controller must be listed here:
         */
        return {
            getRoom : getRoom,
            addQuestion : addQuestion
        }
    }

})();

