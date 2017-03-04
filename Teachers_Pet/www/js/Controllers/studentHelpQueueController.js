(function() {
    'use strict';

    angular
        .module('studentHelpQueueController', [])
        .controller('studentHelpQueueController', studentHelpQueueController);


    function studentHelpQueueController($scope, $stateParams, $state, roomDataService, firebaseDataService, $ionicNavBarDelegate) {
    	console.log('student page controller fired');
    	
        $scope.room = roomDataService.getRoom();

        /* JUST FOr testing */
        $scope.dummyData = [
        {
          head: "Teachers!",
          body: "Tired of never being able to help anybody because there's simply not enough time? Then Teacher's Pet&trade; is just what you need!"
        },
        {
          head: "Hjælp mig lærer Birgitte!",
          body: "Det er så svært at jeg bliver nødt til at spørge dig om hjælp så vær sød og kom ned på min plads, jeg sidder nede bagved og helt til venstre. Jeg havde egentlig tænkt mig at sidde på anden række men der sidder Bjarke, og ham kan jeg ikke så godt lide tihi."
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

        // Update the title of the view
        $ionicNavBarDelegate.title('Student Help Queue');

        //Hide back button
        $ionicNavBarDelegate.showBackButton(false);
    }


})();