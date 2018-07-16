'use strict';

angular.module('webApp.reports', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/reports', {
		templateUrl: 'reports/reports.html',
		controller: 'reportsCtrl'
	});
}])
