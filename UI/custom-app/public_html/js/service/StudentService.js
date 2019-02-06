(function () {
    'use strict';

    angular
            .module('myApp.StudentService', [])
            .factory('StudentService', StudentService);

    StudentService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', '$localStorage', '$sessionStorage','configData','$q'];
    function StudentService($http, $cookieStore, $rootScope, $timeout, $localStorage, $sessionStorage,configData,$q) {
        var service = {};
        var domain = "Student".toLowerCase();
       // $http.defaults.headers.common['Auth_Token'] = $rootScope.globals.userDTO.token;
        service.getAllStudents = getAllStudents;
        service.saveStudent = saveStudent;
        service.updateStudent = updateStudent;
        service.getStudent = getStudent;
        return service;       
        
		function getAllStudents(id) {
            return $http.get(configData.url+'student/list/'+id,config).then(handleSuccess, handleError('Error getting Student ')); 
        }
		
		function getStudent(id) {
            return $http.get(configData.url+'student/'+id,config).then(handleSuccess, handleError('Error getting Student'));
        }

        function saveStudent(data) {
         return $http.post(configData.url+'student', data,config).then(handleSuccess, handleError('Error saving Students '));    
        }

        function updateStudent(data) {
            return $http.put(configData.url+'student', data,config).then(handleSuccess, handleError('Error saving Students '));   
        }
        
        function handleSuccess(res) {
            var deferred = $q.defer();
            if(res.data.errorCode) {
                   console.log(res.data.errorCode+' - '+res.data.errorMessage);
                   deferred.reject(res.data);
            } else {
                   deferred.resolve(res.data);
            }
            return deferred.promise;
        } 

        function handleError(error) { 
            return $q.reject(error); 
        } 


    }
})();
