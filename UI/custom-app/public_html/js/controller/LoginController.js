'use strict';

angular.module('myApp.LoginController', [])
        .controller('LoginController', ['$scope', '$rootScope', '$window', '$location', '$http', '$sessionStorage','$localStorage','AuthenticationService', 'FlashService', '$cookieStore' ,function ($scope, $rootScope, $window, $location, $http, $sessionStorage,$localStorage,AuthenticationService, FlashService, $cookieStore) {

                $scope.slide = '';
                $scope.loginData = {};
                $rootScope.back = function () {
                    $scope.slide = 'slide-right';
                    $window.history.back();
                }
                /*$rootScope.go = function (path) {
                    $scope.slide = 'slide-left';
                    $location.url(path);
                }*/
                $rootScope.isheader = false;
                $sessionStorage.resetpage=false;
                $scope.resetform =function()
                {
                      var vm=$scope.vm;

                   vm.username="";
                   vm.password="";

                }
                $scope.login = function ()
                {
                	$rootScope.isTrascError = false;
                $scope.loading = true;
				var continuesave = true;
				var username = $scope.username;
				//var password = window.btoa($scope.password);
				var password = $scope.password;
			
				
                if(username===null ||username===undefined ||username===""){
                    $rootScope.isTrascError = true;
                    $scope.loading = false;
                    FlashService.Error("User Name is required.");
                    continuesave = false;
                }
                else if($scope.password===null ||$scope.password===undefined ||$scope.password===""){
                    $rootScope.isTrascError = true;
                    $scope.loading = false;
                    FlashService.Error("Password is required.");
                    continuesave = false;
                }
                if(continuesave){
                	
				AuthenticationService.Login(username, password, function (result) {
				
                                           if (!result.userId) {
 						  $rootScope.isLogin=false;
						$rootScope.isTrascError = true;
                    				FlashService.Error("Username or Password incorrect.");
                                             $scope.loading = false;
                                           }else{
                           $rootScope.isLogin=true;
                           $location.path('/student');
						}
					              				
            });
                } 
                }
                $scope.resetpassword = function()
                {
      
                	 $rootScope.isLogin=false;
                	 $rootScope.isResetpage=true;
					 
							$location.path('/resetpassword');
						
						
							$sessionStorage.resetpage=true;
							 
                }
                $scope.logout = function ()
                {
                	 var headers = {
                			    'Auth_Token':$rootScope.globals.userDTO.token
                			  }

                		var config={
                			  headers:headers
                		}
                	AuthenticationService.Logout();
                	$rootScope.isLogin=false;
                
                	$location.path('/login');
                }
                
                $scope.backtologin = function ()
                {
                
                
                	$rootScope.isLogin=false;
                	$rootScope.isRestpage=true;
                	$sessionStorage.resetpage=false;
                	$rootScope.isResetpage=false;
                	$location.path('/login');
                }
            }]);
