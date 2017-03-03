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
    controller: 'joinRoomController'
  })

  .state('createRoom', {
    url: '/createroom',
    templateUrl: 'templates/createRoom.html',
    controller: 'createRoomController'
  })

  .state('roomSettings', {
    url: '/roomsettings',
    templateUrl: 'templates/roomSettings.html',
    controller: 'roomSettingsController'
  })

  .state('teacherHelpQueue', {
    url: '/teacherqueue',
    templateUrl: 'templates/teacherHelpQueue.html',
    controller: 'teacherHelpQueueController'
  })

  .state('studentHelpQueue', {
    url: '/studentqueue',
    templateUrl: 'templates/studentHelpQueue.html',
    controller: 'studentHelpQueueController'
  })

  .state('getHelp', {
    url: '/gethelp',
    templateUrl: 'templates/getHelp.html',
    controller: 'getHelpController'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsController'
  })

  .state('test', {
    url: '/test',
    templateUrl: 'templates/test.html'
  })

  .state('studentTabBar', {
    url: '/studentTabBar',
    templateUrl: 'templates/studentTabBar.html',
    abstract:true
  });

$urlRouterProvider.otherwise('/entrypage');



});
