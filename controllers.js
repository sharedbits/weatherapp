var lang = 'en';	//language variable; used in search functions
var un = 'metric';	//unit variable; used in search functions
var app = angular.module('myApp', ['pascalprecht.translate','ngStorage']);
app.controller('myController', function($scope, $http, $translate, $localStorage) {
	$scope.iconId = 'null';
	$scope.slctdCity = false;
	$scope.error = false;
	$scope.frcst = false;
	$scope.frcstDay = "";
	$scope.unit_temp = "°C";
	$scope.unit_speed = "km/h";
	$scope.date = new Date();
	$scope.zipClass="";
	$scope.coordClass="";
	$scope.searchName = function(){	//will display a list of the different cities found, else the weather info about the only city found, else error message
		searchByName($scope, $http, $localStorage);	
	}
	$scope.searchCoord = function(){	//will display the weather info about the city nearest to the entered coordinates
		searchByCoord($scope, $http, $localStorage);
	}
	$scope.searchZip = function(){	//will display the weather info about the city with the corresponding ZIP code
		searchByZip($scope, $http, $localStorage);
	}
	$scope.citySlct = function(id){	//will display the weather info about the city clicked in the proposed list
		citySelection($scope, $http, id, $localStorage);
	}
	$scope.changeLanguage = function(key){	//applies the selected language to the template
		$translate.use(key);
		lang = key;
		reloadJSONDisplay($scope, $http, $localStorage);	//if the language changes, the datas displayed need to be translated too
	};
	$scope.unitChoice = function(choice){	//modifies the unit displayed according to the user's selection
		if(un != choice){
			un = choice;
			reloadJSONDisplay($scope,$http);
		}
		if(un == 'metric'){
			$scope.unit_temp = "°C";
			$scope.unit_speed = "km/h"
		}
		else{
			$scope.unit_temp = "F";
			$scope.unit_speed = "mph"
		}
	}
	$scope.getFrcst = function(){	//will display the weather forecasts for the selected city according to the forecast choice of the user
		getForecast($scope,$http);
	}
	citySelection($scope, $http, $localStorage.id, $localStorage);	//when loading the page, uses the last selected city for display
});

app.config(function($translateProvider){	//configure the JSON for translations
	$translateProvider.translations('en', translationEN);	//page is translated in English
	$translateProvider.translations('fr', translationFR);	//page is translated in French
	$translateProvider.preferredLanguage('en');	//English as default language
	$translateProvider.fallbackLanguage('en');	//English as fallback language
	$translateProvider.useSanitizeValueStrategy('escaped');
});