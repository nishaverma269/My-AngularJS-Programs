'use strict';
angular.module('webApp.showContractors', ['ngRoute', 'ngCsv', 'ngFlatDatepicker', 'ngSanitize', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/showContractors', {
        templateUrl: 'showContractors/showContractors.html',
        controller: 'showContractorsCtrl'
    });
}]).controller('showContractorsCtrl', ['$scope', '$filter', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function ($scope, $filter, CommonProp, $firebaseArray, $firebaseObject, $location) {
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    /*
        showContractorsCtrl maintains the model involved with all of the contractors, which is adding, deleting and updating contractors. At first, it shows all contractors involved and can change by typing in the search bar in showContractors.html, which filters out contractors based on what it is typed. 
        For Example: Typing in cameron will give all contractors with that name and typing in 213 will give all contractors with that pin.
    */
    /*
        Done to create the firebaseArray for Company that can show up in the dropdown menu for Companies
    */
    if (!$scope.username) {
        $location.path('/home');
    }
    
    $scope.getArray = [];
    var rootRef = firebase.database().ref().child('Hardwares');
    $scope.hardwares = $firebaseArray(rootRef);
    $scope.hardwares.$loaded().then(function () {
        angular.forEach($scope.hardwares, function (user) {
            $scope.getArray.push({
                "propertyTag": user.propertyTag,
                "description": user.description,
                "specifications": user.specifications,
                "purchasedDate": user.purchasedDate,
                "amount": user.amount,
                "vendor": user.vendor,
                "po": user.po,
                "serial": user.serial,
                "location": user.location,
                "person": user.person
            });
            
        })
    });
    /* Sort Function */
    $scope.propertyName = 'propertyTag';
    $scope.reverse = true;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    /* Edit method for getting contractor's information from firebase database. */
    $scope.editContractor = function (id) {
        var rootRef = firebase.database().ref().child('Hardwares/' + id);
        $scope.editContractorData = $firebaseObject(rootRef);
        /*var ref = firebase.database().ref();
        ref.child('Hardwares').once("value", function (snapshot) {
            var userData = snapshot.val();
            console.log(userData.getKey);
        });*/
        $scope.date = new Date(pdate/*$scope.newPlayer.purchasedDate*/);
        $scope.datepickerConfig = {
            allowFuture: false
        };
    };
   
     
    /* Update method for updating contractor's information in firebase database. */
    $scope.updateContractor = function (id) {
        var ref = firebase.database().ref().child('Hardwares/' + id);
        
        ref.update({
            propertyTag: $scope.editContractorData.propertyTag,
            description: $scope.editContractorData.description,
            specifications: $scope.editContractorData.specifications,
            purchasedDate: $filter('date')($scope.date, 'MM/dd/yyyy'),
            amount: $scope.editContractorData.amount,
            vendor: $scope.editContractorData.vendor,
            po: $scope.editContractorData.po,
            serial: $scope.editContractorData.serial,
            location: $scope.editContractorData.location,
            person: $scope.editContractorData.person
        }).then(function (ref) {
            $scope.$apply(function () {
                $("#editModal").modal('hide');
            });
        }, function (error) {
            console.log(error);
        });
    };
    /* Delete method */
    $scope.deleteCnf = function (hardware) {
        $scope.deleteHardware = hardware;
    };
    /* Confirm before deleting */
    $scope.finalizeDelete = function (deleteHardware) {
        $scope.hardwares.$remove(deleteHardware);
        $("#deleteModal").modal('hide');
    };
    /* Logout method for Admin */
    $scope.logout = function () {
        CommonProp.logoutUser();
    };
}]);
