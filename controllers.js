var lang = 'en';	//language variable; used in search functions
var un = 'metric';	//unit variable; used in search functions
var app = angular.module('myApp', ['pascalprecht.translate','ngStorage']);
app.controller('myController', function($scope, $http, $translate, $localStorage) {
	$scope.iconId = 'null';
	$scope.slctdCity = false;
	$scope.error = false;
	$scope.frcst = false;
	$scope.frcstDay = "";
	$scope.cityName = $localStorage.name;
	$scope.unit = "°C";
	$scope.searchName = function(){	//will display a list of the different cities found, else the weather info about the only city found, else error message
		searchByName($scope, $http, $localStorage);	
	}
	$scope.searchCoord = function(){	//will display the weather info about the city nearest to the entered coordinates
		searchByCoord($scope, $http, $localStorage);
	}
	$scope.searchZip = function(){
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
	$scope.unitChoice = function(choice){
		if(un != choice){
			un = choice;
			reloadJSONDisplay($scope,$http);
		}
		if(un == 'metric')	$scope.unit = "°C";
		else	$scope.unit = "F";
	}
	$scope.getFrcst = function(){
		getForecast($scope,$http);
	}
	citySelection($scope, $http, $localStorage.id, $localStorage);
});

app.config(function($translateProvider){	//configure the JSON for translations
	$translateProvider.translations('en', translationEN);	//page is translated in English
	$translateProvider.translations('fr', translationFR);	//page is translated in French
	$translateProvider.preferredLanguage('en');	//English as default language
	$translateProvider.fallbackLanguage('en');	//English as fallback language
	$translateProvider.useSanitizeValueStrategy('escaped');
});