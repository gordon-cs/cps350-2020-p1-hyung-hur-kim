
let clearDay = require('./Images/weather-icons_clear-day-2.png');
let clearNight = require('./Images/weather-icons_clear-night-2.png');
let cloudy = require('./Images/weather-icons_cloudy-2.png');
let fog = require('./Images/weather-icons_fog-2.png');
let partlyCloudyDay = require('./Images/weather-icons_partly-cloudy-day-2.png');
let partlyCloudyNight = require('./Images/weather-icons_partly-cloudy-night-2.png');
let rain = require('./Images/weather-icons_rain-2.png');
let sleet = require('./Images/weather-icons_sleet-2.png');
let snow = require('./Images/weather-icons_snow-2.png');
let thunderstorm = require('./Images/weather-icons_thunderstorm-2.png');
let wind = require('./Images/weather-icons_wind-2.png');

export default async function getImageIcon(icon) {
	
			let useIcon = clearDay;

		    if(icon == "sleet")
		    {
		    	useIcon = sleet;
		    }
		    if(icon == "thunderstorm")
		    {
		    	useIcon = thunderstorm;
		    }
		    else if(icon == "fog")
		    {
		    	useIcon = fog;
		    }
		    else if(icon == "wind")
		    {
		    	useIcon = wind;
		    }
		    else if(icon == "rain")
        {
          useIcon = rain;
        }
        else if (icon == "partly-cloudy-day")
        {
          useIcon = partlyCloudyDay;
        }
        else if (icon == 'snow')
        {
          useIcon = snow;
        }
        else if (icon == 'clear-night')
        {
          useIcon = clearNight;
        }
        else if (icon == 'partly-cloudy-night')
        {
          useIcon = partlyCloudyNight;
        }
        else if (icon == 'cloudy')
        {
		  useIcon = cloudy;
		  
	}
	return useIcon;
}