import { useState, useEffect } from "react";
import Header from "../Header";
import "./index.css";


const Weather = () => {
  const [data, setData] = useState(null);
  const [location,setLocation] = useState({lat:null,lon:null})


  useEffect(() =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat=position.coords.latitude;
            const lon=position.coords.longitude;
            setLocation({lat,lon});
            fetchWeatherData(lat,lon);
        },(error)=>{
            console.error("Unable to get location", error);
            alert("Unable to get location")
        },{
            enableHighAccuracy: true,  // Request high accuracy
            timeout: 5000,  // Timeout after 5 seconds
            maximumAge: 0,  // Do not use cached location
          })

    }
  },[])

  const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=31e5eef16b83f28bee5b652a4bf37190&units=metric`
    );
    const data = await response.json();
    setData(data);
  };

  // Convert Unix timestamp to a readable local time format
  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Formats to local date and time
  };

  // Convert wind degree to cardinal direction
  const getWindDirection = (degree) => {
    if (degree >= 0 && degree < 45) return "North";
    if (degree >= 45 && degree < 135) return "East";
    if (degree >= 135 && degree < 225) return "South";
    if (degree >= 225 && degree < 315) return "West";
    return "North"; // Default
  };

  return (
    <div>
      <Header />
      <div>
        {data ? (
          <div>
            <h1>
              Weather in {data.name}, India{" "}
              <img
                className="logo-flag"
                alt="indian flag"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.FdQQANZmVCL3AO00WRJs1wHaFj%26pid%3DApi&f=1&ipt=cf42b03d36c98e0974b4c7a8da5a9464fe0acc9792df84616c35e8dacc3df8aa&ipo=images"
              />
            </h1>
            {data.main ? (
              <>
                <p>Temperature: {data.main.temp}°C</p>
                <p>Feels Like: {data.main.feels_like}°C</p>
                <p>Weather: {data.weather[0].description}</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind Speed: {data.wind.speed} m/s</p>
                <p>Pressure: {data.main.pressure} hPa</p>
                <p>Wind Direction: {getWindDirection(data.wind.deg)}</p>
                <p>Time of the Day: {convertTime(data.dt)}</p>
                <p>Sunrise: {convertTime(data.sys.sunrise)}</p>
                <p>Sunset: {convertTime(data.sys.sunset)}</p>
              </>
            ) : (
              <p>Weather data is not available</p>
            )}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
