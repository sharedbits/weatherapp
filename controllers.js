var lang = 'en';	//language variable; used in search functions
var un = 'metric';	//unit variable; used in search functions
var app = angular.module('myApp', ['pascalprecht.translate']);
app.controller('myController', function($scope, $http, $translate) {
	$scope.iconId = 'null';
	$scope.slctdCity = false;
	$scope.error = false;
	$scope.cityName = "Lyon";
	$scope.unit = "°C";
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
	$scope.changeLanguage = function(key){	//applies the selected language to the template
		$translate.use(key);
		lang = key;
		reloadJSONDisplay($scope, $http);	//if the language changes, the datas displayed need to be translated too
	};
	$scope.unitChoice = function(choice){
		if(un != choice){
			un = choice;
			reloadJSONDisplay($scope,$http);
		}
		if(un == 'metric')	$scope.unit = "°C";
		else	$scope.unit = "F";
	}
});

app.config(function($translateProvider){	//configure the JSON for translations
	$translateProvider.translations('en', translationEN);	//page is translated in English
	$translateProvider.translations('fr', translationFR);	//page is translated in French
	$translateProvider.preferredLanguage('en');	//English as default language
	$translateProvider.fallbackLanguage('en');	//English as fallback language
	$translateProvider.useSanitizeValueStrategy('escaped');
});

/*app.config(function($httpProvider){
	$httpProvider.useApplyAsync(true);
});*/