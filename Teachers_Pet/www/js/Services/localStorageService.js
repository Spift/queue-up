(function() {
    'use strict';

    angular
        .module('localStorageService', [])
        .factory('localStorageService', localStorageService);

    function localStorageService() {
    	/*
    	 * Fetch the name stored locally on the users device
    	 */
    	function getName() {
    		name = localStorage.getItem("name");
    		if(name == "null") { // is this a good error code?
    			return -1;
    		}
    		return name;
    	}
    	/*
    	 * Store the given name locally on the users device
    	 */
    	function setName(name) {
    		localStorage.setItem("name", name); // store with id = "name"
    	}
    	/*
    	 * Check that local storage is supported (should be)
    	 */
    	function checkLocalStorageSupport() {
    		if (typeof(Storage) !== "undefined") {
			    return false;
			} 
			return true;
    	}
    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		getName : getName,
    		setName : setName,
    		checkLocalStorageSupport:checkLocalStorageSupport
    	}
    }

})();
