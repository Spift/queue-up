(function() {
    'use strict';

    angular
        .module('entryPageController', [])
        .controller('entryPageController', entryPageController);

    function entryPageController($scope, $location, $rootScope, $stateParams, $state, localStorageService, $timeout, codeGeneratorService) {

      /* video background script necessary to run the vid
       * the two event listeners checks for minimizing and restoring the app */
      var video = document.getElementById('video-bg');
      video.addEventListener('canplay', function() {
          video.play();
      });
      video.play();

      document.addEventListener("pause", () => {
        console.log('paused');
        video.pause();
      }, false);

      document.addEventListener("resume", () => {
        console.log('resume');
        video.play();
      }, false);

    	console.log('entry page controller fired');
      console.log('Stored name:' + localStorageService.getName());
      console.log('Stored ID:' + localStorageService.getStudentID());

      $scope.formData = {};

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
          head: "I am here to help, if you need me",
          body: "The following bullet points or slider pages contain a small introduction to the app and its functionalities. If you need help joining or creating a room, please refer to these.<br><br>Thank you for trying out Q.up!"
        },
        {
          head: "Hello there",
          body: "Q.up is a student and TA (Teaching Assistant) tool that aims to distribute the given help during a class in a more efficient and fair way using the 'first come, first served' principle."
        },
        {
          head: "Join a room (for students)",
          body: "1. Enter your name<br>2. Press the 'Join Room' button<br>3. Enter the 'Room Code' received from your TA.<br>4. Click 'Join this room' once the room has been found.<br>5. Feel free to ask questions by clicking the 'Get Help' icon.<br>6. The TA will see your question pop up and will locate you once it is your turn to receive help."
        },
        {
          head: "Join a room (for teachers)",
          body: "1. Enter your name.<br>2. Press the 'Join Room' button<br>3. Press the 'Need to join as Teacher?' text.<br>4. Enter the 'Room Code' and 'Teacher Code'.<br>5. Click 'Join as Teacher' once the room has been found."
        },
        {
          head: "Create a room (for teachers)",
          body: "1. Enter your name.<br>2. Press the 'Create Room' button.<br>3. Enter a relevant name and description for your room.<br>4. Enter one or more subjects the students can ask about,<br>use the '+' icon to add a subject.<br>5. Press the 'Create Room' button, once the room is ready.<br>6. Questions will then pop up in the queue once the students starts posting them.<br>7. Click on the first question and press the 'Help name' button."
        }
      ];

    }


})();
