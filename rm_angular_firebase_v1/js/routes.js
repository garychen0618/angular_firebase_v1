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
      
      $routeProvider.when('/sap_configure', {
         authRequired: true,
         templateUrl: 'partials/sap_configure.html',
         controller: 'sapConfigureCtrl'
      });
      
      $routeProvider.when('/con_list', {
         authRequired: true,
         templateUrl: 'partials/con_list.html',
         controller: 'ConListCtrl'
      });
      
      $routeProvider.when('/rmhome', {
         authRequired: true,
         templateUrl: 'partials/rmlist.html',
         controller: 'RmhomeCtrl'
      });
      
      $routeProvider.when('/test', {
         //authRequired: true,
         templateUrl: 'partials/test.html',
         controller: 'TestCtrl'
      });
      
      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });
      
      $routeProvider.when('/setting', {
         authRequired: true,
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