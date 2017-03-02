(function() {
    'use strict';

    angular
        .module('firebaseDataService', [])
        .factory('firebaseDataService', firebaseDataService);

    /*
     * Just a dummy service to see if firebase works.....
     */
    function firebaseDataService($firebaseObject, $firebaseArray) {
    	/*
    	 * Fetch all the data listed in the People database.
    	 */
    	function getPeople() {
    		var peopleRef = firebase.database().ref("People");
  			var people = $firebaseArray(peopleRef);

  			return people;
    	}
    	/*
    	 * Fetch a single person listed in the People database.
    	 */
    	function getPersonByName(name) {
    		var peopleRef = firebase.database().ref("People/" + name);
  			var person = $firebaseArray(peopleRef);

  			return person;
    	}
    	/*
    	 * Add specific person from People database
    	 */
    	function addPerson(name, age) {
        var personRef = firebase.database().ref("People/" + name);
        personRef.set({'name' : name,
                        'age' : age});
    	}
    	/*
    	 * Remove specific person from People database
    	 */
    	function removePerson(id) {
        console.log(id);
    		var personRef = firebase.database().ref("People/" + id);
        personRef.remove();
    	}

    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		getPeople : getPeople,
    		getPersonByName : getPersonByName,
    		removePerson : removePerson,
    		addPerson : addPerson
    	}
    }

})();
