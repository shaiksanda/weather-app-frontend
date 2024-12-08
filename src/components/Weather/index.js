import { useState, useEffect } from "react";
import { L26, } from 'react-isloading'
import Header from "../Header";

import "./index.css";


const Weather = () => {
    const [data, setData] = useState(null);



    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetchWeatherData(lat, lon);
            }, (error) => {
                console.error("Unable to get location", error);
                alert("Unable to get location")
            }, {
                enableHighAccuracy: true,  // Request high accuracy
            })

        }
    }, [])

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
        <div className="weather-container">
            <Header />
            <div>
                {data ? (
                    <div>
                        <h1 style={{ textAlign: "center" }}>
                            Weather in  {data.name.replace(/-/g, '')}, India

                        </h1>
                        {data.main ? (
                            <>
                                <div className="weather-data-container">
                                    <div className="data-container data-container-1">
                                        <img alt="" className="icon" src="https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png" />
                                        <p className="content">Temperature: {data.main.temp}°C</p>
                                    </div>
                                    <div className="data-container data-container-2">
                                        <img alt="" className="icon" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733644926/temp_img_huksja.png" />
                                        <p className="content">Feels Like: {data.main.feels_like}°C</p>
                                    </div>
                                    <div className="data-container data-container-3">
                                        <img alt="" className="icon" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733645119/Screenshot_2024-12-08_133359_xthsqr.png" />
                                        <p className="content">Weather: {data.weather[0].description}</p>
                                    </div>
                                    <div className="data-container data-container-4">
                                        <img alt="" className="icon" src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1733645398/Screenshot_2024-12-08_133947_euzivx.png" />
                                        <p className="content">Humidity: {data.main.humidity}%</p>
                                    </div>
                                    <div className="data-container data-container-5">
                                        <img alt="" className="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rvRvX_EvmIGK50BQvoKQkQAAAA%26pid%3DApi&f=1&ipt=34c71c0f56e958101a9ab90d88616fd6072f65e505710838750b28e1a586ee9c&ipo=images" />
                                        <p className="content">Wind Speed: {data.wind.speed} m/s</p>
                                    </div>

                                    <div className="data-container data-container-6">
                                        <img alt="" className="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Ya0DS5YiQmRgBPCYOCObUwHaHa%26pid%3DApi&f=1&ipt=43896af799bb9ae757ad2542a5727ff572bb6ddc432fba47fee7ef2740d9a05b&ipo=images" />
                                        <p className="content">Pressure: {data.main.pressure} hPa</p>
                                    </div>
                                    <div className="data-container data-container-7">
                                        <img alt="" className="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.zopRzYPgOssNMd3Kej9F4gHaGM%26pid%3DApi&f=1&ipt=6dada31aa98515598031f8140a2113f9c942b3d274c7a4ac60928bcc961ae601&ipo=images" />
                                        <p className="content">Wind Direction: {getWindDirection(data.wind.deg)}</p>
                                    </div>
                                    <div className="data-container data-container-8">
                                        <img alt="" className="icon" src="https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png" />
                                        <p className="content">Time of the Day: {convertTime(data.dt)}</p>
                                    </div>
                                    <div className="data-container data-container-9">
                                        <img alt="" className="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.O2bezZG1-YkKDXW-vSK90wHaEo%26pid%3DApi&f=1&ipt=70e2bb173380931469ee12eb9a312f1d1ad93eb0e9c59f3c8ee9b818fd3d4bef&ipo=images" />
                                        <p className="content">Sunrise: {convertTime(data.sys.sunrise)}</p>
                                    </div>
                                    <div className="data-container data-container-10">
                                        <img alt="" className="icon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.gTYLIaSb6qvbVUzBrWvq5QHaEc%26pid%3DApi&f=1&ipt=3ae6a0093087564331dc771a9df741d2277fc2965b1716d77fa9d551e892cc93&ipo=images" />
                                        <p className="content">Sunset: {convertTime(data.sys.sunset)}</p>
                                    </div>
                                </div>

                            </>
                        ) : (
                            <p>Weather data is not available</p>
                        )}
                    </div>
                ) : (
                    <L26
                        style={{
                            height: "6rem",
                            width: "6rem",
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Weather;
