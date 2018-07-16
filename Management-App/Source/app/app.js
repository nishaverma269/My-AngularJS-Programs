'use strict';
// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ngRoute', 'ngCsv', 'ngFlatDatepicker'
  , 'webApp.home'
  , 'webApp.register'
  , 'webApp.welcome'
  , 'webApp.addPost'
  , 'webApp.addHardwareInventory'
  , 'webApp.contractorAdmin'
  , 'webApp.adminSettings'
  , 'webApp.reports'
  , 'webApp.showContractors'
  , 'webApp.addContractor'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
