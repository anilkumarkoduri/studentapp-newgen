var shapoorji = angular.module('myApp', [
    'ngRoute',
    'myApp.config',
    'ngCookies',
    'ngStorage',
    'ngFileUpload',
    'ui.bootstrap',
    'angularjs-dropdown-multiselect',
    'myApp.LoginController',
    'myApp.AuthenticationService',
    'angularUtils.directives.dirPagination',
    'myApp.FlashService',
 	'myApp.StudentController',
	'myApp.StudentService',
	'ngTouch',
    'ui.grid',
    'ui.grid.exporter',
    'ui.grid.selection',
    'ui.grid.pinning',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.moveColumns',
  'angularjs-dropdown-multiselect',
  'ui.grid.expandable',
  'ngMaterial',
  'ngMessages'
])
.config(config);
shapoorji.directive(
		'validNumber',
		function() {
			return {
				require : '?ngModel',
				link : function(scope, element, attrs, ngModelCtrl) {
					if (!ngModelCtrl) {
						return;
					}
					ngModelCtrl.$parsers.push(function(val) {
						if (angular.isUndefined(val)) {
							var val = '';
						}
						var clean = val.replace(/[^-0-9\.]/g, '');
						var negativeCheck = clean.split('-');
						var decimalCheck = clean.split('.');
						if (!angular.isUndefined(negativeCheck[1])) {
							negativeCheck[1] = negativeCheck[1].slice(0,
									negativeCheck[1].length);
							clean = negativeCheck[0] + '-' + negativeCheck[1];
							if (negativeCheck[0].length > 0) {
								clean = negativeCheck[0];
							}
						}

						if (!angular.isUndefined(decimalCheck[1])) {
							decimalCheck[1] = decimalCheck[1].slice(0, 2);
							clean = decimalCheck[0] + '.' + decimalCheck[1];
						}

						if (val !== clean) {
							ngModelCtrl.$setViewValue(clean);
							ngModelCtrl.$render();
						}
						return clean;
					});

					element.bind('keypress', function(event) {
						if (event.keyCode === 32) {
							event.preventDefault();
						}
					});
				}
			};
		}).directive('validOnlynumber', function() {
	return {
		require : '?ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			if (!ngModelCtrl) {
				return;
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^0-9]+/g, '');
				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});

			element.bind('keypress', function(event) {
				if (event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
}).directive('noSpecialChar', function() {
	return {
		require : 'ngModel',
		restrict : 'A',
		link : function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				if (inputValue == null)
					return ''
				cleanInputValue = inputValue.replace(/[^a-zA-Z0-9\s]/gi, '');
				if (cleanInputValue != inputValue) {
					modelCtrl.$setViewValue(cleanInputValue);
					modelCtrl.$render();
				}
				return cleanInputValue;
			});
		}
	}
}).directive('inputRestrictor', [
                                     function() {
                                    	    return {
                                    	      restrict: 'A',
                                    	      require: 'ngModel',
                                    	      link: function(scope, element, attr, ngModelCtrl) {
                                    	        // Matches characters that aren't `0-9`, `.`, `+`, or `-`
                                    	        var pattern = /[^.0-9+-]/g;


                                    	        function fromUser(text) {
                                    	          var rep = /[+]/g;  // find + symbol (globally)
                                    	          var rem = /[-]/g;  // find - symbol (globally)
                                    	          rep.exec(text);
                                    	          rem.exec(text);

                                    	          // Find last index of each sign
                                    	          // The most recently typed characters are last
                                    	          var indexp = rep.lastIndex;
                                    	          var indexm = rem.lastIndex;

                                    	          // remove formatting, and add it back later
                                    	          text = text.replace(/[+.-]/g, '');
                                    	          if (indexp > 0 || indexm > 0) {// Are there signs?
                                    	            if (indexp > indexm){ // plus sign typed later?
                                    	              text = "+" + text;
                                    	            } else text = "-" + text;
                                    	          }

                                    	          var transformedInput = text.replace(pattern, '');
                                    	          transformedInput = transformedInput.replace(
                                    	            /([0-9]{1,2}$)/, ".$1" // make last 1 or 2 digits the decimal
                                    	          )
                                    	          ngModelCtrl.$setViewValue(transformedInput);
                                    	          ngModelCtrl.$render();
                                    	          return transformedInput;
                                    	        }
                                    	        ngModelCtrl.$parsers.push(fromUser);
                                    	      }
                                    	    };
                                    	  }
                                    	]).directive('onlyAlphabets', function() {
	return {
		require : 'ngModel',
		restrict : 'A',
		link : function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				if (inputValue == null)
					return ''
				cleanInputValue = inputValue.replace(/[0-9]/, '');
				if (cleanInputValue != inputValue) {
					modelCtrl.$setViewValue(cleanInputValue);
					modelCtrl.$render();
				}
				return cleanInputValue;
			});
		}
	}
}).directive('onlyNumber', function() {
	return {
		require : 'ngModel',
		restrict : 'A',
		link : function(scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function(inputValue) {
				if (inputValue == null)
					return ''
				cleanInputValue = inputValue.replace(/[^0-9]/, '');
				if (cleanInputValue != inputValue) {
					modelCtrl.$setViewValue(cleanInputValue);
					modelCtrl.$render();
				}
				return cleanInputValue;
			});
		}
	}
});



function config($routeProvider, $httpProvider) {

     $routeProvider.when('/login', {title:"Login", templateUrl: 'views/login.html', controller: 'LoginController', controllerAs: 'vm'});
     $routeProvider.when('/student', {templateUrl: 'views/studentList.html',    title: 'Student', controller: 'StudentController', controllerAs: 'vm'});
	 $routeProvider.when('/logout', {templateUrl: 'views/login.html', title: 'Login', controller: 'LoginController', controllerAs: 'vm'});
     $routeProvider.otherwise({redirectTo: '/login'});
     };
//shapoorji.run(['$rootScope', '$route','$location', '$cookieStore', '$http','$window',
     shapoorji.run(run);
    
	 function run($rootScope, $location, $cookieStore, $http, AuthenticationService,
		$window, $route,$cookieStore,$sessionStorage, $localStorage) {
            console.log($sessionStorage.globals);
     
    if($cookieStore.get("LOGGEDINBROWSERID")!=undefined){
    if($cookieStore.get("LOGGEDINBROWSERID")!=sessionStorage.TABID)
    {
     $location.path('/login');
        
    }
    }
     
      //  alert("logged in browserid"+$cookieStore.get("LOGGEDINBROWSERID")); 
        
        
        //alert("newtab id"+sessionStorage.TABID)
		$rootScope.isLogin = $sessionStorage.Login;
		$rootScope.features = $localStorage.features;
		$rootScope.globals = $sessionStorage.globals;
		if($location.path()==='/login'){
			$rootScope.isLogin =false;
			$rootScope.features = "";
			$sessionStorage.Login =false;
			$http.defaults.headers.common['Auth_Token'] ='';
		}
	$rootScope.$on('$routeChangeSuccess', function() {
		$window.document.title = $route.current.title;
	});
         
	$rootScope.$on('$locationChangeStart', function(event, next, current) {
          
		
	});
	
 };
