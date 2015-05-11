var lang = 'en';	//language variable; used in the search functions
var app = angular.module('myApp', ['pascalprecht.translate']);
app.controller('myController', function($scope, $http, $translate) {
	$scope.slctdCity = false;
	$scope.error = false;
	$scope.cityName = "Lyon";
	$scope.searchName = function(){	//will display a list of the different cities found, else the weather info about the only city found, else error message
		searchByName($scope, $http);	
	}
	$scope.searchCoord = function(){	//will display the weather info about the city nearest to the entered coordinates
		searchByCoord($scope, $http);
	}
	$scope.searchZip = function(){
		searchByZip($scope, $http);
	}
	$scope.citySlct = function(id){	//will display the weather info about the city clicked in the proposed list
		citySelection($scope, $http, id);
	}
	$scope.changeLanguage = function(key) {	//applies the selected language to the template
		$translate.use(key);
		lang = key;
		reloadJSONDisplay($scope, $http);	//if the language changes, the datas displayed need to be translated too
	};
});

app.config(function($translateProvider){	//configure the JSON for translations
	$translateProvider.translations('en', translationEN);	//page is translated in English
	$translateProvider.translations('fr', translationFR);	//page is translated in French
	$translateProvider.preferredLanguage('en');	//English as default language
	$translateProvider.fallbackLanguage('en');	//English as fallback language
	$translateProvider.useSanitizeValueStrategy('escaped');
});