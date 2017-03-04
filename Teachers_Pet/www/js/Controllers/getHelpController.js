(function() {
    'use strict';

    angular
        .module('getHelpController', [])
        .controller('getHelpController', getHelpController);

    function getHelpController($scope, $stateParams, $state, $ionicNavBarDelegate) {
    	console.log('get help controller fired');
    	
        // ng-model from help input body
        $scope.getHelpBody;

    	$scope.test = function() {
    		console.log("i do nothing");
    	}

        // Update the title of the view
        $ionicNavBarDelegate.title('Get Help');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);

    }


})();