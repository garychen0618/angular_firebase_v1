"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         authRequired: true,
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });
      
      $routeProvider.when('/rmhome', {
         authRequired: true,
         templateUrl: 'partials/rmlist.html',
         controller: 'RmhomeCtrl'
      });
      
      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });
      
      $routeProvider.when('/setting', {
         templateUrl: 'partials/device.html',
         controller: 'DeviceCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);