'use strict';

angular.module('webApp.adminSettings', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/adminSettings', {
		templateUrl: 'adminSettings/adminSettings.html',
		controller: 'adminSettings'
	});
}])
