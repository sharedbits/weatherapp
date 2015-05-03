var app = angular.module('myApp', []);
app.controller('myController', function($scope, $http) {
	$scope.slctdCity = false;
	$scope.cityName = "Lyon";
	$scope.searchName = function(){
		$scope.slctdCity = false;
		$http.get("http://api.openweathermap.org/data/2.5/find?q=" + encodeURIComponent($scope.cityName) + "&type=like")
		.success(function (response) {
			if(response.count != 0){
				$scope.cities = response.list;
				}
			else{
				$scope.cities[0].id = "No city found";
				}
			}
			);
		}
	$scope.citySelection = function(id){
	$http.get("http://api.openweathermap.org/data/2.5/weather?id=" + id)
	.success(function(response){
		$scope.city = response;
		$scope.slctdCity = !($scope.slctdCity);})
	}
});