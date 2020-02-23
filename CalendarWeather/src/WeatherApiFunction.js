export default async function getWeatherApi() {

    const darkskyURL = "https://api.darksky.net/forecast";
    //const ApiKey = "7711c2819f294564cb912e166a5bb983";
    const ApiKey = "bc93403c5c01303ccfdb0fe8ab518409";    
    const latLon = "42.589611,-70.819806";
    var unit = "us";
  let response, responseJson;
  
    try {
      response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon + "?units=" + unit);
	  responseJson = await response.json();
    } catch (error) {
      return error;
	}
	
	return responseJson;
  }