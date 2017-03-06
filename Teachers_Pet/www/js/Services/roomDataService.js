(function() {
    'use strict';

    angular
        .module('roomDataService', [])
        .factory('roomDataService', roomDataService);

    /*
     * Store data for a specific room, so that it can be accessed here across views/states. Maybe not needed?
     */
    function roomDataService($firebaseObject, $firebaseArray) {
    	var roomFirebaseObject = {};
        /*
         * Get the firebase object that contains all data for the current room
         */
        function getRoom() {
            return roomFirebaseObject;
        }
        /*
         * Set/update the firebase object that contains all data for the current room
         */
        function setRoom(newRoom) {
            roomFirebaseObject = newRoom;
        }
        /*
         * Clear the room saved in this service, because were going to another room.
         */
        function clearRoom() {
            roomFirebaseObject = {};
        }
    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		getRoom:getRoom,
            setRoom:setRoom
    	}
    }

})();
