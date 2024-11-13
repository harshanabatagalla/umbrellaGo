import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/currentWeather.css';

const CurrentWeather = () => {
    const [lat, setLat] = useState(6.927079);
    const [lon, setLon] = useState(79.861244);
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    const [weatherDetails, setWeatherDetails] = useState({
        temp: null,
        humidity: null,
        wind: null,
        description: null,
        icon: null,
        city: null,
        country: null,
        feelsLike: null,
        visibility: null,
        sunrise: null,
        sunset: null
    });

    const formatTime = (timestamp) => { //format the timestamp to time
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            console.log(response.data);
            setWeatherDetails(
                {
                    temp: response.data.main.temp,
                    humidity: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                    city: response.data.name,
                    country: response.data.sys.country,
                    feelsLike: response.data.main.feels_like,
                    visibility: response.data.visibility / 1000,
                    sunrise: formatTime(response.data.sys.sunrise),
                    sunset: formatTime(response.data.sys.sunset)
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);
                },
                () => {
                    console.log("Unable to retrieve your location");
                }
            );
        } 
        else {
            console.log("Geolocation not supported");
        }
        fetchData();
    }, []);


    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <card className='weather-card'>
            </card>
        </>
    );
}
export default CurrentWeather;