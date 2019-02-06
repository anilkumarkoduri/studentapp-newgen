'use strict';
angular.module('myApp.StudentController', []).controller('StudentController',
        StudentController);
StudentController.$inject = ['$interval', '$q', '$scope', '$rootScope', '$window', '$location',
    '$http', '$localStorage', 'StudentService', 'FlashService', '$timeout', '$cookieStore'];
function StudentController($interval, $q, $scope, $rootScope, $window, $location, $http,
        $localStorage, StudentService, FlashService, $timeout, $cookieStore) {
    var vm = this;
    $rootScope.isheader = true;
    $rootScope.isTrascError = false;
    $scope.studentList = "";
    $scope.iseditable = true;
    $scope.rowSize = 5;
    $scope.isSelectedRow = null;
    $scope.selectedRowDetails = [];
    $scope.disable_Create = false;
    $scope.disable_Edit = true;
    $scope.disable_Delete = true;
    $scope.disable_View = true;
    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;
    $scope.studentList = [];
	$scope.QeOrganization = [];  
    $scope.sort = function (keyname) {
        if ($scope.studentList != null) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
    }

$scope.editSelectedRowDetails = function(Student){
     editStudentDetails(Student);
     $scope.isSelectedRow = Student.studentId;
     toggleButtons();
}
    $timeout(function () {
        $scope.availOperations = $localStorage.availOperations;
    }, 400);
var fakeI18n = function( title ){
	    var deferred = $q.defer();
	    $interval( function() {
	      deferred.resolve( 'col: ' + title );
	    }, 1000, 1);
	    return deferred.promise;
	  };
		  $scope.gridOptions = {
	  };

            $scope.gridOptions = {
              paginationPageSizes: [25, 50, 75],
              paginationPageSize: 25,
              exporterMenuCsv: true,
              enableGridMenu: true,
              enableFiltering: true,
              gridMenuTitleFilter: fakeI18n,
              columnDefs: [
                { name: 'studentId', displayName:"Student ID" },
                {name:'firstName',displayName:"First Name" },
                {name:'lastName',displayName:"Last Name" },
				{name:'email',displayName:"Email" },
				{name:'phone',displayName:"Phone" },
				{name:'location',displayName:"Location" },
				{name:'dateOfBirth',displayName:"Date of Birth" },
                {name:'studentId',displayName:"Action",cellTemplate: '<div  class="ui-grid-cell-contents" >  <div class="col-sm-12 lookup-action"> \
                     &nbsp; <i class="fa fa-pencil-square-o" ng-click="grid.appScope.editStudent(COL_FIELD)" style="cursor:pointer" ></i> \
                     &nbsp; <i class="fa fa-eye" ng-click="grid.appScope.viewStudent(COL_FIELD)"  style="cursor:pointer"></i> \
                 </div></div> ',enableFiltering: false,width:100}
              ],

              onRegisterApi: function( gridApi ){
                $scope.gridApi = gridApi;

                // interval of zero just to allow the directive to have initialized


                gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
                  $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
                });
              }
            };
			
    $scope.init = function () {	
		var instituteId = $cookieStore.get('globals').userDTO.instituteId;
    	StudentService.getAllStudents(instituteId).then(function (data) {
		$scope.studentList = data;            
			$scope.gridOptions.data = $scope.studentList;
        }).catch(function(error){
            var errmsg="Error";
            if(error.errorMessage!=undefined){
                errmsg=error.errorMessage;
            }
            $scope.failureTextAlert = errmsg;
            $scope.showFailureAlert = true;
            $timeout(function () {
                    $scope.showFailureAlert= false;
            }, 3000);
        });
    };

	$scope.selectRow = function (item) {
        // for checking single row selection
        $scope.isSelectedRow = item.id;
        toggleButtons();
        if (item != undefined) {
            $scope.selectedRowDetails = item;
        } 
    }
	
    $scope.clearSelectedRow = function () {
        $scope.isSelectedRow = null;
        toggleButtons();
    }

	$scope.operationsGenericFunction = function (doFunction, url) {
        // passing selected operation url
        $scope.opeationsURL = url;
        if (doFunction === "Create") {
            createStudent();
        }
        if (doFunction === "View" && !$scope.disable_View) {
            viewStudentDetails($scope.selectedRowDetails);
        }
        if (doFunction === "Edit" && !$scope.disable_Edit) {
            editStudentDetails($scope.selectedRowDetails);
        }
        if (doFunction === "Delete" && !$scope.disable_Delete) {
            showDeleteConfirmationPopup();
        }
    }
	$scope.viewStudent=function(value){
		$scope.Student = {};
		$scope.Student.studentId = value; 
		viewStudentDetails($scope.Student);
	}
	 function viewStudentDetails(Student) {
	        $scope.headername = "View Student";
	        $rootScope.isTrascError = false;
	        StudentService.getStudent(Student.studentId).then(function (data) {
	            $scope.Student = data.data.object;
				if(data.data.object.active==1){
					$scope.Student.active = true;
				}else{
					$scope.Student.active = false;
				}
				if(data.data.object.isSuperOrg==1){
					$scope.Student.isSuperOrg = true;
				}else{
					$scope.Student.isSuperOrg = false;
				}
	        }).catch(function(error){
	            //var errmsg=appConstants.exceptionMessage;
                 var errmsg="Error";
	            if(error.errorMessage!=undefined){
	                errmsg=error.errorMessage;
	            }
	            $scope.failureTextAlert = errmsg;
	            $scope.showFailureAlert = true;
	            $timeout(function () {
	                    $scope.showFailureAlert= false;
	            }, 3000);
	        });
	        $scope.isUpdatable=false;
	        $scope.iseditable = false;
            $scope.iscodeeditable =true;
            $('div').removeClass('has-error edited');
            $('input[type=text]').removeClass('form-control').addClass('form-control edited');
            $('textarea').removeClass('form-control').addClass('form-control edited');
            $('select').removeClass('form-control').addClass('form-control edited');
	       $('#Student-model').modal({show: true, backdrop: 'static'});
	    }
	$scope.editStudent=function(value){
	$scope.Student = {};
		$scope.Student.studentId = value; 
		editStudentDetails($scope.Student);
	}
	 function editStudentDetails(Student) {
        $scope.headername = "Edit Student";
        $rootScope.isTrascError = false;
        StudentService.getStudent(Student.studentId).then(function (data) {
            $scope.Student = data.data.object;
			if(data.data.object.active==1){
			$scope.Student.active = true;
		}else{
			$scope.Student.active = false;
		}
		if(data.data.object.isSuperOrg==1){
			$scope.Student.isSuperOrg = true;
		}else{
			$scope.Student.isSuperOrg = false;
		}
        }).catch(function(error){
            //var errmsg=appConstants.exceptionMessage;
            if(error.errorMessage!=undefined){
                errmsg=error.errorMessage;
            }
            $scope.failureTextAlert = errmsg;
            $scope.showFailureAlert = true;
            $timeout(function () {
                    $scope.showFailureAlert= false;
            }, 3000);
        });
		$scope.isUpdatable=true;
        $scope.iseditable = true;
        $scope.iscodeeditable =false;
        $('div').removeClass('has-error edited');
        $('input[type=text]').removeClass('form-control').addClass('form-control edited');
        $('textarea').removeClass('form-control').addClass('form-control edited');
        $('select').removeClass('form-control').addClass('form-control edited');
       $('#Student-model').modal({show: true, backdrop: 'static'});
    }
	
	
    function toggleButtons() {
        if ($scope.isSelectedRow == null) {
            $scope.disable_Edit = true;
            $scope.disable_View = true;
            $scope.disable_Delete = true;
        } else {
            $scope.disable_Edit = false;
            $scope.disable_View = false;
            $scope.disable_Delete = false;
        }
    }

	 $scope.createStudent = function() {
        $scope.headername = "Create Student";
        $rootScope.isTrascError = false;
        $scope.iseditable = true; 
        $scope.iscodeeditable =true;
        $scope.isUpdatable=false;
		$scope.Student = {
                "studentId":"",
				"firstName":"",
                "lastName":"", 
                "email":"",
                "phone":"",
                "location":"",
				"dateOfBirth":"",
				 "instituteId" : $rootScope.globals.userDTO.instituteId
            };
       $('#Student-model').modal({show: true, backdrop: 'static'});
    };

	
    $scope.searchStudents = function () {
		$scope.searchData = {orgName:$scope.orgName,isSuperOrg:$scope.isSuperOrg}; var searchData = JSON.stringify($scope.searchData);
		StudentService.searchStudents(searchData).then(function (data) {
                $scope.studentList = data.data.objects;
            }).catch(function(error){
               // var errmsg=appConstants.exceptionMessage;
                var errmsg="Error";
                if(error.errorMessage!=undefined){
                    errmsg=error.errorMessage;
                }
                $scope.failureTextAlert = errmsg;
                $scope.showFailureAlert = true;
                $timeout(function () {
                        $scope.showFailureAlert= false;
                }, 3000);
            });
    };

    $scope.clearSearch = function () {
        $scope.orgName='';$scope.isSuperOrg='';
        $scope.clearSelectedRow();
        $scope.init();
    };
   
    $scope.saveStudent = function (Student) {
        $scope.continuesave = true;
        $rootScope.isTrascError = false;
        if(!$scope.Student.firstName){ 
 $rootScope.isTrascError = true;
 FlashService.Error('Please Enter Student First Name'); 
 $scope.continuesave = false;}else if(!$scope.Student.lastName){ 
 $rootScope.isTrascError = true;
 FlashService.Error('Please Enter Student Last Name'); 
 $scope.continuesave = false;}else if(!$scope.Student.email){ 
    $rootScope.isTrascError = true;
    FlashService.Error('Please Enter Email'); 
    $scope.continuesave = false;}
        if ($scope.continuesave) {
            $scope.Student = {
                "studentId":$scope.Student.studentId,"firstName":angular.uppercase($scope.Student.firstName),
                "lastName":angular.uppercase($scope.Student.lastName), 
                "email":$scope.Student.email,
                "phone":angular.uppercase($scope.Student.phone),
                "location":$scope.Student.location,
				"dateOfBirth":$scope.Student.dateOfBirth,
				 "instituteId" : $rootScope.globals.userDTO.instituteId
            };
            if (!$scope.Student.studentId) {
            	
            	
                StudentService
                        .saveStudent($scope.Student)
                        .then(
                                function (result) {
                                    if(result){
                                        $('#Student-model').modal('hide');
                                        $scope.init();
                                        $scope.successTextAlert = "Student created successfully";
                                        $scope.showSuccessAlert = true;
                                        $scope.clearSelectedRow();
                                    $timeout(function () {
                                        $scope.showSuccessAlert = false;
                                    }, 3000);
                                }else{
                                    $rootScope.isTrascError = true;
                                    FlashService.Error("Failed");
                                    $timeout(function () {
                                            $rootScope.isTrascError= false;
                                    }, 3000); 
                                }
                                }).catch(function(error){
                                    $rootScope.isTrascError = true;
                                    FlashService.Error("Failed");
                                    $timeout(function () {
                                            $rootScope.isTrascError= false;
                                    }, 3000); 
                                    
                                });
            } else {
                StudentService
                        .updateStudent($scope.Student)
                        .then(
                                function (result) {
                                        if(result.metadata.status==='SUCCESS'){
                                        $('#Student-model').modal('hide');
                                        $scope.init();
                                        $scope.successTextAlert = result.metadata.message;
                                        $scope.showSuccessAlert = true;
                                        $scope.clearSelectedRow();
                                    $timeout(function () {
                                        $scope.showSuccessAlert = false;
                                    }, 3000);
                                }else{
                                    $rootScope.isTrascError = true;
                                    FlashService.Error(result.metadata.message);
                                    $timeout(function () {
                                            $rootScope.isTrascError= false;
                                    }, 3000); 
                                }
                                }).catch(function(error){
                                    $rootScope.isTrascError = true;
                                    FlashService.Error(error.data.metadata.message);
                                    $timeout(function () {
                                            $rootScope.isTrascError= false;
                                    }, 3000); 
                                    
                                });
            }
    }
};	
    $scope.init();
}
