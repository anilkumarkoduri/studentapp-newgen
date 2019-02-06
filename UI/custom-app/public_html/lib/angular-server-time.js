/*
* AngularJS Server Time Sync - 1.0.0
* https://github.com/idangozlan/angular-server-time
* Built by Idan Gozlan (c)
*/
(function(){
	'use strict';
	angular.module('serverTime', [])
		.factory('serverTimeService', ['$rootScope','$timeout',function($rootScope,$timeout) {
				var obj = {};
				obj.timeOffset = 0;
				obj.init = function(serverTime){
					obj.timeOffset = serverTime - new Date().getTime();
					obj.updateClock();
					return obj;
				};
				obj.updateClock = function(){
					obj.time = new Date(new Date().getTime()+obj.timeOffset).getTime();
					$timeout(obj.updateClock,1000);
				};
			return obj;
		}]);
})(document, window, window.angular);