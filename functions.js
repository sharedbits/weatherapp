/*-------------------------------------------------
	searchByName(display, service)	
	Gets the JSON about the cities corresponding to the 'cityName' field and puts it in the 'cities' array of 'display'
	
	IN : display ($scope) and service ($http)
	OUT : n/a
-------------------------------------------------*/
function searchByName(display, service){
	display.error = false;
	service.get("http://api.openweathermap.org/data/2.5/find?q="
		+ encodeURIComponent(display.cityName)
		+ "&type=like"
		+ "&lang=" + encodeURIComponent(lang))
		.success(function (response) {
			if(response.count > 1){
				display.slctdCity = false;
				display.cities = response.list;
				}
			else{
				if(response.count == 1){
					citySelection(display, service, response.list[0].id);
				}
				else{
					errorOccurred(display, 2);
				}
			}
		})
		.error(function(){
		errorOccurred(display, 1);
		})
}

/*-------------------------------------------------	
	searchByCoord(display, service)
	Gets the JSON about the city corresponding to the 'lat' and 'lon' fields and puts it in 'city' of 'display'
	
	IN : display ($scope) and service ($http)
	OUT : n/a
-------------------------------------------------*/
function searchByCoord(display, service){
	display.error = false;
	service.get("http://api.openweathermap.org/data/2.5/weather?lat="
		+ encodeURIComponent(display.lat)
		+ "&lon=" + encodeURIComponent(display.lon)
		+ "&lang=" + encodeURIComponent(lang))
	.success(function(response){
		display.slctdCity = true;
		display.city = response;
	})
	.error(function(){
		errorOccurred(display, 1);
	})
}

/*-------------------------------------------------	
	searchByZip(display, service)
	Gets the JSON about the city corresponding to 'zip' and 'country' fields and puts it in 'city' of 'display'
	
	IN : display ($scope) and service ($http)
	OUT : n/a
-------------------------------------------------*/
function searchByZip(display, service){
	display.error=false;
	service.get("http://api.openweathermap.org/data/2.5/weather?zip="
	+ encodeURIComponent(display.zip)
	+ "," + encodeURIComponent(display.country) +
	"&lang" + encodeURIComponent(lang))
	.success(function(response){
		if(response.cod == '404'){
			errorOccurred(display,3);
		}
		else{
			display.slctdCity = true;
			display.city = response;	
		}
	})
	.error(function(){
		errorOccurred(display,1);
	})
}

/*-------------------------------------------------
	citySelection(display, service, id)	
	Performs the displaying of the weather information of the city described by 'id'
	
	IN : display ($scope), service ($http) and city id (id)	
	OUT : n/a
-------------------------------------------------*/
function citySelection(display, service, id){
	display.error = false;
	service.get("http://api.openweathermap.org/data/2.5/weather?id=" + id)
	.success(function(response){
		display.slctdCity = true;
		display.city = response;
	})
	.error(function(){
		errorOccurred(display, 1);
	})
}

/*-------------------------------------------------
	reloadJSONDisplay(display, service)
	Reloads the JSON data from the weather API in the newly selected language
	
	IN : display ($scope), and service ($http)
	OUT : n/a
-------------------------------------------------*/
function reloadJSONDisplay(display,service){
	
}

/*-------------------------------------------------
	errorOccurred(display, code)
	Performs the displaying of the error encountered. The error is identified by its 'code'
	
	IN : display ($scope) and error code (code)
	OUT : n/a
-------------------------------------------------*/
function errorOccurred(display, code){
	switch(code){
		case 1:{
			display.err_info = "ERRCASE1";
			display.error = true;
			display.slctdCity = true;
		}
		
		case 2:{
			display.err_info = "ERRCASE2";
			display.error = true;
			display.slctdCity = true;
		}
		
		case 3:{
			//display.err_info = "ZIP codes not available in this country"
			display.err_info = "ERRCASE3";
			display.error = true;
			display.slctdCity = true;
		}
	}
}