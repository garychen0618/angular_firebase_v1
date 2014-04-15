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
      
      $routeProvider.when('/rmhome/setting', {
         authRequired: true,
         templateUrl: 'partials/setting.html'
      });
      
      $routeProvider.when('/rmhome/setting/con_list/sap_configure', {
         authRequired: true,
         templateUrl: 'partials/sap_configure.html',
         controller: 'sapConfigureCtrl'
      });
      
      $routeProvider.when('/rmhome/setting/con_list', {
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
      
      $routeProvider.when('/rmhome/setting/device', {
         authRequired: true,
         templateUrl: 'partials/device.html',
         controller: 'DeviceCtrl'
      });

      $routeProvider.when('/rmhome/setting/userprofile', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });
      
      $routeProvider.when('/rmhome/poa', {
         authRequired: true,
         templateUrl: 'partials/poa.html',
         controller: 'POACtrl'
      });
      
      $routeProvider.when('/rmhome/poa/new', {
         authRequired: true,
         templateUrl: 'partials/ponew.html',
         controller: 'PONewCtrl'
      });
      
      $routeProvider.when('/rmhome/poa/rel', {
         authRequired: true,
         templateUrl: 'partials/po_rel.html',
         controller: 'PORelCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/rmhome'});
   }]);