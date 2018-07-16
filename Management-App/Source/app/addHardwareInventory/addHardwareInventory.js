'use strict';
angular.module('webApp.addHardwareInventory', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addHardwareInventory', {
        templateUrl: 'addHardwareInventory/addHardwareInventory.html'
        , controller: 'AddHardwareInventoryCtrl'
    });
}]).controller('AddHardwareInventoryCtrl', ['$scope', '$filter', '$firebaseArray', '$location', 'CommonProp', function ($scope, $filter, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    $scope.filterValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
    var ref = firebase.database().ref().child('Hardwares');
    $scope.inventory = $firebaseArray(ref);
    $scope.addHardwareInventory = function () {
        var propertyTag = $scope.inventory.propertyTag;
        var description = $scope.inventory.description;
        var specifications = $scope.inventory.specifications;
        var purchasedDate = $scope.inventory.purchasedDate;
        var amount = $scope.inventory.amount;
        var vendor = $scope.inventory.vendor;
        var po = $scope.inventory.po;
        var serial = $scope.inventory.serial;
        var location = $scope.inventory.location;
        var person = $scope.inventory.person;
        var member = $scope.username;
        var date = new Date();
        $scope.inventory.$add({
            member: member
            , propertyTag: propertyTag
            , description: description
            , specifications: specifications
            , purchasedDate: purchasedDate
            , amount: amount
            , vendor: vendor
            , po: po
            , serial: serial
            , location: location
            , person: person
            , date: $filter('date')(new Date(), 'MM/dd/yyyy')
        }).then(function (ref) {
            console.log(ref);
            $scope.success = true;
            window.setTimeout(function () {
                $scope.$apply(function () {
                    $scope.success = false;
                });
            }, 2000);
        }, function (error) {
            console.log(error);
        });
        $scope.inventory.propertyTag = "";
        $scope.inventory.description = "";
        $scope.inventory.specifications = "";
        $scope.inventory.purchasedDate = "";
        $scope.inventory.amount = "";
        $scope.inventory.vendor = "";
        $scope.inventory.po = "";
        $scope.inventory.serial = "";
        $scope.inventory.location = "";
        $scope.inventory.person = "";
    };
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]);