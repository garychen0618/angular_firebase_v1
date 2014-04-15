'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])
  
  .controller('RmhomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.rmlist = syncData('rmapp', 10);
   }])
  
  .controller('POACtrl', ['$scope', 'syncData','loginService', function($scope, syncData,loginService) {
      $scope.polists = syncData('user06/0001', 10);
      $scope.po_lists_page = 'true';
      $scope.po_page = 'false';
      $scope.page_poitem_show = 'false';
      var username = loginService.firstPartOfEmail($scope.auth.user.email);
      $scope.DisplayPO = function(relcode,po){
          $scope.pos = po;
          $scope.rel_code = relcode;
          $scope.po_lists_page = 'false';
          $scope.po_page = 'true';
      };
      $scope.DisplayItem = function(poitem){
          $scope.poitems = poitem;
          $scope.po_lists_page = 'false';
          $scope.po_page = 'false';
          $scope.page_poitem_show = 'true';
      };
      $scope.ApprovePO = function(rel_code,po_number){
          console.log("Rel_Code:"+rel_code);
          $scope.release_po = syncData('Task/OnTime', 10);
          var po_data = {
              EVENT_ID:'0002',
              PO_REL_CODE:rel_code,
              PURCHASEORDER:po_number,
              USER_ID:username,
              METHOD:'post'
          };
          $scope.release_po.$add(po_data);
          $scope.po_lists_page = 'true';
          $scope.po_page = 'false';
      };
   }])
   
   .controller('TestCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.rmlist = syncData('Task', 10);
   }])
  
  .controller('PONewCtrl', ['$scope', 'syncData','loginService','$location', function($scope, syncData, loginService,$location) {
      
      $scope.REL_CODE = null;
      $scope.REL_GROUP = null;
      $scope.err = null;
      var username = loginService.firstPartOfEmail($scope.auth.user.email);
      
      console.log("Release Code:"+$scope.REL_CODE);
      $scope.con_list = syncData('Task/Schedule', 10);
      $scope.AddConList = function(){
          if(!$scope.REL_CODE)
          {
              $scope.err = 'Please Enter a Release Code!';
          }
          else if (!$scope.REL_GROUP)
          {
              $scope.err = 'Please Enter a Release Group!';
          }
          else
          {
              //console.log("Release Code2:"+$scope.REL_CODE);
              var con_lists = {
                    EVENT_ID:'0001',
                    REL_CODE:$scope.REL_CODE,
                    REL_GROUP:$scope.REL_GROUP,
                    USER_ID:username,
                    METHOD:'put'
              };
              $scope.con_list.$add(con_lists);
          }
      };
      $scope.DeleteCon = function(conid){
          $scope.con_list.$remove(conid);
      };
      $scope.BackList = function(){
          $location.path('/rmhome/poa');
      };
   }])
  
  .controller('PORelCtrl', ['$scope', 'syncData','loginService', function($scope, syncData, loginService) {
        $scope.name = loginService.firstPartOfEmail($scope.auth.user.email);
        $scope.rel_po_lists = syncData('0002/'+$scope.name, 10);
   }])
  
  .controller('sapConfigureCtrl', ['$scope', 'syncData','loginService','$location', function($scope, syncData,loginService,$location) {
      //$scope.sapConfigure = syncData('sapConfigure', 10);
//      console.log($scope.auth.user.uid);
//      console.log($scope.auth.user.name);
        $scope.sys = {};
        $scope.name = loginService.firstPartOfEmail($scope.auth.user.email);
        $scope.sapConfigure = syncData('sapConfigure/'+$scope.name, 10);
        //console.log($scope.name);
//        var test = {server: 'vmw5067',
//                    instance_number:'06'};
        $scope.test = $scope.sys;
        $scope.AddConfigure = function(){
            if($scope.test){
                $scope.sapConfigure.$add($scope.test);
                $location.path('/rmhome/setting/con_list');
            }
        }
   }])
  
  .controller('ConListCtrl', ['$scope', 'syncData','loginService','$location', function($scope, syncData,loginService,$location) {
        
         $scope.name = loginService.firstPartOfEmail($scope.auth.user.email);
         $scope.con_lists = syncData('sapConfigure/'+$scope.name, 10);
         $scope.NewConfigure = function(){
             $location.path('/rmhome/setting/con_list/sap_configure');
         };
         $scope.DeleteCon = function(conid){
             //console.log(conid);
             //loginService.assertAuth();
             $scope.con_lists.$remove(conid);
         };
   }])
   
  .controller('DeviceCtrl', ['$scope', 'syncData','loginService', function($scope, syncData,loginService) {
      
      $scope.device = device;
      var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
        var networkState = navigator.connection.type;
        $scope.connection = states[networkState];
        $scope.connect_time = new Date().toLocaleTimeString().split(" ")[0];
        
        $scope.name = loginService.firstPartOfEmail($scope.auth.user.email);
        $scope.devices = syncData('devices/'+$scope.name, 10);
        
        $scope.addDevice = function() {
         if( $scope.device ) {
                $scope.devices.$add($scope.device);
         }
        };
        $scope.DeleteDevice = function(deviceid){
            $scope.devices.$remove(deviceid);
        };
   }])
   
  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };
      
      $scope.ResetPassword = function(){
          if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else{
             loginService.sendPasswordResetEmail($scope.email);
         }
      };
      
      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', function($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL) {
      $scope.syncAccount = function() {
         //$scope.user = {};
         syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user').then(function(unBind) {
            $scope.unBindAccount = unBind;
         });
      };
      // set initial binding
      $scope.syncAccount();

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
         $scope.emailerr = null;
         $scope.emailmsg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      $scope.updateEmail = function() {
        $scope.reset();
        // disable bind to prevent junk data being left in firebase
        $scope.unBindAccount();
        changeEmailService(buildEmailParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         };
      }
      function buildEmailParms() {
         return {
            newEmail: $scope.newemail,
            pass: $scope.pass,
            callback: function(err) {
               if( err ) {
                  $scope.emailerr = err;
                  // reinstate binding
                  $scope.syncAccount();
               }
               else {
                  // reinstate binding
                  $scope.syncAccount();
                  $scope.newemail = null;
                  $scope.pass = null;
                  $scope.emailmsg = 'Email updated!';
               }
            }
         };
      }

   }]);