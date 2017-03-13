(function() {
    'use strict';

    angular
        .module('colorService', [])
        .factory('colorService', colorService);

    function colorService() {
    	/* Colors to chose from.
    	 * TODO: pick better colors
    	 */
	    var Colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF', '#297c51', '#7c2828', '#7f1487', '#148783', '#871443', '#179b97', '#110a54', '#85d662'];
	    /*
    	 * get integer that is unique to string
    	 */
	    function hashCode(str) {
		    var hash = 0;
		    for (var i = 0; i < str.length; i++) {
		       hash = str.charCodeAt(i) + ((hash << 5) - hash);
		    }
		    return hash;
		}
		/*
		 * "dampen" the color to make it less "popping" / more neutral. I totally wrote this myself.
		 */
		function dampenColor(color, percent) {   
		    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
		    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		}
		/*
    	 * does what is says on the tin. <dampen> argument toggles whether or not the color should be desaturated
    	 */
		function getColorFromString(str, dampen=true){
			var i = hashCode(str);
		    var color = Colors[Math.abs(i % Colors.length)];
		    if(dampen) {
		    	color = dampenColor(color, 0.7);
			}
		    return color;
		}
    	/*
    	 * Available methods that the service should offer to the controller must be listed here:
    	 */
    	return {
    		getColorFromString : getColorFromString
    	}
    }

})();
