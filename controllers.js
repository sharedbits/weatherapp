var app = angular.module('myApp', []);
app.controller('myController', function($scope, $http) {
	$scope.slctdCity = false;
	$scope.error = false;
	$scope.cityName = "Lyon";
	$scope.searchName = function(){//will display a list of the different cities found, else the weather info about the only city found, else error message
		searchByName($scope, $http);	
	}
	$scope.searchCoord = function(){//will display the weather info about the city nearest to the entered coordinates
		searchByCoord($scope, $http);
	}
	$scope.searchZip = function(){
		searchByZip($scope, $http);
	}
	$scope.citySlct = function(id){//will display the weather info about the city clicked in the proposed list
		citySelection($scope, $http, id);
	}
});