'use strict';

angular.module('webApp.contractorAdmin', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/contractorAdmin', {
		templateUrl: 'contractorAdmin/contractorAdmin.html'
	});
}])
