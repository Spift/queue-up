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
            var ref = firebase.database().ref("Rooms/" + roomCode);
            var room = $firebaseObject(ref);
                    
            return room;
        }
        /*
         * Add room to firebase
         */
        function addRoom(roomObj){
            var ref = firebase.database().ref("Rooms/");
            ref.child(roomObj.code).set(roomObj);
        }
        /*
         * Update a room already in the database. 
         */
        function updateRoom(roomID, changes){
            var ref = firebase.database().ref("Rooms/");
            ref.child(roomID).update(changes);
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
         * Remove a question from a room.
         * //TODO catch errors here by promise resolution on remove call or callback
         */
        function removeQuestion(roomCode, question_id) {
            var ref = firebase.database().ref("Rooms/" + roomCode + "/Questions");
            ref.child(question_id).remove();
        }
        /*
         * Available methods that the service should offer to the controller must be listed here:
         */
        return {
            getRoom : getRoom,
            updateRoom : updateRoom,
            addQuestion : addQuestion,
            removeQuestion : removeQuestion,
            addRoom : addRoom
        }
    }

})();

