(function() {
    'use strict';

    angular
        .module('codeGeneratorService', [])
        .factory('codeGeneratorService', codeGeneratorService);

    function codeGeneratorService() {
    	/*
    	 * generate code of <length> 
    	 */
    	function generateCode(length) {
		  	// Math.random should be unique because of its seeding algorithm.
		  	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
		  	// after the decimal.
		  	// credit: https://gist.github.com/gordonbrander/2230317
			return (""+Math.random().toString(36).substr(2, length)).toUpperCase();
    	}
    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		generateCode:generateCode
    	}
    }

})();
