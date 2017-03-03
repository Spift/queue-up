angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  /*
  .state('tabsController', {
    url: '/tabcontroller',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })*/
  .state('entryPage', {
    url: '/entrypage',
    templateUrl: 'templates/entryPage.html',
    controller: 'entryPageController'
  })

  .state('joinRoom', {
    url: '/joinroom',
    templateUrl: 'templates/joinRoom.html',
    controller: 'joinRoomController',
    cache: false
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsController',
    cache: false
  })

  .state('createRoom', {
    url: '/createroom',
    templateUrl: 'templates/createRoom.html',
    controller: 'createRoomController',
    cache: false
  })

  .state('roomSettings', {
    url: '/roomsettings',
    templateUrl: 'templates/roomSettings.html',
    controller: 'roomSettingsController',
    cache: false
  })

  .state('teacherHelpQueue', {
    url: '/teacherqueue',
    templateUrl: 'templates/teacherHelpQueue.html',
    controller: 'teacherHelpQueueController',
    cache: false
  })

  .state('studentHelpQueue', {
    url: '/studentqueue',
    templateUrl: 'templates/studentHelpQueue.html',
    controller: 'studentHelpQueueController',
    cache: false
  })

  .state('getHelp', {
    url: '/gethelp',
    templateUrl: 'templates/getHelp.html',
    controller: 'getHelpController',
    cache: false
  })

$urlRouterProvider.otherwise('/entrypage');



});
