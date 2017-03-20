(function() {
    'use strict';

    angular
        .module('constantsService', [])
        .factory('constantsService', constantsService);

    function constantsService(localStorageService) {
    	/* Colors to chose from.
    	 * TODO: pick better colors
    	 */
	    var Constants = {}
	    Constants.IN_NIGHT_MODE = false;
	    /*
    	 * get all the constants
    	 */
	    function getConstants() {
		    return Constants;
		}
		/*
    	 * set all the constants
    	 */
	    function setConstants(newConstants) {
		    Constants = newConstants;
		}

    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		getConstants : getConstants,
    		setConstants : setConstants
    	}
    }

})();
