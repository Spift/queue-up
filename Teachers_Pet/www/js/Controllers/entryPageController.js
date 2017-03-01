(function() {
    'use strict';

    angular
        .module('entryPageController', [])
        .controller('entryPageController', entryPageController);

    function entryPageController($scope, $stateParams, $state) {
    	console.log('entry page controller fired');
    	/*
    	 * dummy function
    	 */
    	$scope.test = function() {
    		console.log("i do nothing")
    	}

        /*
         * slider stufff
         */
        $scope.data = {};
        $scope.data.currentPage = 0;
        var setupSlider = function() {
            //some options to pass to our slider
            $scope.data.sliderOptions = {
              initialSlide: 0,
              direction: 'horizontal', //or vertical
              speed: 300, //0.3s transition
              pager:true,
              paginationType: 'bullet',
              loop: true
            };

            //create delegate reference to link with slider
            $scope.data.sliderDelegate = null;

            //watch our sliderDelegate reference, and use it when it becomes available
            $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
              if (newVal != null) {
                $scope.data.sliderDelegate.on('slideChangeEnd', function() {
                  $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
                  //use $scope.$apply() to refresh any content external to the slider
                  $scope.$apply();
                });
              }
            });
        };
        setupSlider();

    }


})();