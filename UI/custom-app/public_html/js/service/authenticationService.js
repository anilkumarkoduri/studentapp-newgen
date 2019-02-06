(function() {
	'use strict';
	angular.module('myApp.AuthenticationService', []).factory(
			'AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = [ '$http', '$cookieStore', '$rootScope',
			'$timeout', '$localStorage', '$sessionStorage', '$location',
			'$window','configData' ];
	function AuthenticationService($http, $cookieStore, $rootScope, $timeout,
			$localStorage, $sessionStorage, $location, $window,configData) {
		var service = {};
		service.Login = Login;
		service.SetToken = SetToken;
		service.ClearToken = ClearToken;
		service.Base64Encode = Base64Encode;
        service.Base64Decode = Base64Decode;
		service.Logout = Logout;
		return service;

		function Login(username, password, callback) {

			$http.post(configData.url+'user/validate-login', {
				username : username,
				password : password
			}).success(function(response) {
			
				if(response.userId)
					{
					
			SetToken(response);
					}
				callback(response);
					
			}).error(function(error) {
				callback(error);

			});
		}

		function SetToken(result) {

			$rootScope.globals = {
				userDTO : {
					userId : result.userId,
					username : result.username,
					fullName : result.fullName,
					token : result.token,
					instituteId : result.instituteId,
					instituteName : result.instituteName
					}
				};
						$sessionStorage.Login =true;
                       // $http.defaults.headers.common['Auth_Token'] = result.token;
						$cookieStore.put('globals', $rootScope.globals);
						$sessionStorage.globals = $rootScope.globals;
                  }

		function ClearToken() {
                        $rootScope.isLogin=false;
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			$sessionStorage.Login = "";
			$rootScope.isLogin =false;
			$sessionStorage.Login =false;
			$sessionStorage.globals = null;
			//$http.defaults.headers.common['Auth_Token'] = '';
		}

		function Logout() {
			$http.get(configData.url+'/user/logout').success(
					function(response) {
						// callback(response);
						console.log('logout--')
						ClearToken();
						$location.path('/login');
						$window.location.reload(true);
					}).error(function(response) {
				// callback(response);
			});

		}

		function Base64Encode(input) {
        	if(input) {
        		var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        		var output = "";
        		var chr1, chr2, chr3 = "";
        		var enc1, enc2, enc3, enc4 = "";
        		var i = 0;
        		do {
        			chr1 = input.charCodeAt(i++);
        			chr2 = input.charCodeAt(i++);
        			chr3 = input.charCodeAt(i++);
        			enc1 = chr1 >> 2;
        			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        			enc4 = chr3 & 63;
        			if (isNaN(chr2)) {
        				enc3 = enc4 = 64;
        			} else if (isNaN(chr3)) {
        				enc4 = 64;
        			}
        			output = output +
        			keyStr.charAt(enc1) +
        			keyStr.charAt(enc2) +
        			keyStr.charAt(enc3) +
        			keyStr.charAt(enc4);
        			chr1 = chr2 = chr3 = "";
        			enc1 = enc2 = enc3 = enc4 = "";
        		} while (i < input.length);
        		return output;
        	}
        }
        
        function Base64Decode(input) {
          if(input) {
			var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;
			// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
			var base64test = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input)) {
				window
						.alert("There were invalid base64 characters in the input text.\n"
								+ "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n"
								+ "Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);
			return output;
		} 
      }
	}
})();
