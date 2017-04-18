(function() {
    'use strict';

    angular
        .module('entryPageController', [])
        .controller('entryPageController', entryPageController);

    function entryPageController($scope, $location, $rootScope, $stateParams, $state, localStorageService, $timeout, codeGeneratorService) {
    	console.log('entry page controller fired');
      console.log('Stored name:' + localStorageService.getName());
      console.log('Stored ID:' + localStorageService.getStudentID());

      $scope.formData = {};

      /* video background script necessary to run the vid
       * the two event listeners checks for minimizing and restoring the app */
      var video = document.getElementById('video-bg');
      video.addEventListener('canplay', function() {
          video.play();
      })

      document.addEventListener("pause", () => {
        console.log('paused');
      }, false);

      document.addEventListener("resume", () => {
        console.log('resume');
        video.play();
      }, false);

      // if a name exists in local storage, put it in the input field. -1 is an error code i just came up with ......
      var name = localStorageService.getName();
      if(name != -1) {
        $scope.formData.name = name;
      }
      //if an id has NOT previously been created for this user, generate one and store it locally
      var id = localStorageService.getStudentID();
      if(id == -1) {
        var newID = codeGeneratorService.generateCode(10);//10 chars were arbitrarily chosen........
        localStorageService.setStudentID(newID);
      }
      /*
       * Join Room Button press. Always saves the input content to localstorage
       */
      $scope.joinRoomPressed = function() {
        localStorageService.setName($scope.formData.name);
        $state.go("joinRoom");
      }

    	/*
       * Create Room Button press. Always saves the input content to localstorage
       */
      $scope.createRoomPressed = function() {
        localStorageService.setName($scope.formData.name);
        $state.go("createRoom");
      }
      /*
       * Slider Settings
       */
      $scope.data = {};
      $scope.data.currentPage = 0;
      var setupSlider = function() {
          //some options to pass to our slider
          $scope.data.sliderOptions = {
            initialSlide: 0,
            direction: 'horizontal', //or vertical
            speed: 300, //0.3s transition
            pager: true,
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

      // slider data
      $scope.sliderData = [
        {
          head: "Studentss!",
          body: "Det være seg innlagt humor eller tilfeldig genererte ord som ser langt fra troverdige ut."
        },
        {
          head: "Teachers!",
          body: "Tired of never being able to help anybody because there's simply not enough time? Then Teacher's Pet&trade; is just what you need!"
        },
        {
          head: "Schul lehrer!",
          body: "Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie."
        },
        {
          head: "Simon",
          body: "Simon simon simon simon, simon, simon simon. Simon simon simon."
        }
      ];

    }


})();
