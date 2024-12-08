import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherIcons from '../assets/weatherIcons';
import DailyForecast from "./DailyForecast";

const CurrentWeather = () => {
    const [lat, setLat] = useState(7.290572); // Default latitude (Kandy)
    const [lon, setLon] = useState(80.633728); // Default longitude (Kandy)
    const [city, setCity] = useState(null);
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const now = new Date();
    const formattedDate = now.toDateString();

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

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    };

    const handleLocationChange = (event) => {
        event.preventDefault();
        setCity(event.target.elements.city.value);
        onLocationChange(event.target.elements.city.value);
    }

    const fetchData = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            setWeatherDetails({
                temp: response.data.main.temp,
                humidity: response.data.main.humidity,
                wind: response.data.wind.speed,
                description: capitalizeFirst(response.data.weather[0].description),
                icon: response.data.weather[0].icon,
                city: response.data.name,
                country: response.data.sys.country,
                feelsLike: response.data.main.feels_like,
                visibility: response.data.visibility / 1000,
                sunrise: formatTime(response.data.sys.sunrise),
                sunset: formatTime(response.data.sys.sunset)
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onLocationChange = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherDetails({
                temp: response.data.main.temp,
                humidity: response.data.main.humidity,
                wind: response.data.wind.speed,
                description: capitalizeFirst(response.data.weather[0].description),
                icon: response.data.weather[0].icon,
                city: response.data.name,
                country: response.data.sys.country,
                feelsLike: response.data.main.feels_like,
                visibility: response.data.visibility / 1000,
                sunrise: formatTime(response.data.sys.sunrise),
                sunset: formatTime(response.data.sys.sunset)
            });
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
                    fetchData(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    console.log("Unable to retrieve your location. Using default location.");
                    fetchData(lat, lon);
                }
            );
        } else {
            console.log("Geolocation not supported. Using default location.");
            fetchData(lat, lon);
        }
    }, []);

    useEffect(() => {
        <DailyForecast
            lat={lat}
            lon={lon}
            city={city}
        />
    }, [lat, lon]);

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <h3 className="text-md font-light text-neutral-600 sm:text-right my-1"> <span className="font-bold text-black">Today</span> {formattedDate} </h3>
            <div className="flex justify-center items-center flex-col">
                <div className="sm:mt-0 mt-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:text-left">
                        Weather in <span className="font-semibold">{weatherDetails.city || "your location"}</span>
                    </h1>
                    <div className="bg-slate-200 bg-opacity-30 rounded-xl p-4 mt-4 max-w-fit overflow-auto min-w-full mb-4">
                    <h2 className='font-semibold text-xl mb-2 ml-3'>
                Current <span className='font-extralight'>Weather</span>
            </h2>
                        <div className="grid sm:grid-cols-5 grid-cols-1 gap-2 justify-center">
                            <div class="col-span-2 p-4 bg-[#f8fafc] rounded-xl flex sm:flex-col flex-row justify-between items-center w-full border-4 h-full sm:divide-x-0 divide-x-2">
                                <img
                                    src={weatherIcons[weatherDetails?.icon]}
                                    alt="weather icon"
                                    className="w-2/5 sm:w-[150px] md:w-[200px]"
                                />
                                <div className="flex flex-col">
                                    <h2 className="sm:text-6xl md:text-8xl text-6xl text-left text-nowrap mx-4">{weatherDetails?.temp?.toFixed(0)}<span className="text-3xl"> °C</span></h2>
                                    <p className="sm:text-xl text-md text-left text-gray-600 sm:mt-3 mt-0 mx-4">{weatherDetails.description}</p>
                                </div>
                            </div>
                            <div class="col-span-3 flex flex-col justify-between">
                                <form onSubmit={handleLocationChange}>
                                    <div className="w-full flex gap-2 my-4">
                                        <input
                                            id="city"
                                            name="city"
                                            placeholder="City, Location"
                                            type="text"
                                            autoComplete="city"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm/6 pl-3 h-15"
                                        />
                                        <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full">
                                            Search
                                        </button>
                                    </div>
                                </form>
                                <div className="weather-details bg-slate-200 grid grid-cols-2 p-2 gap-2 rounded-xl h-fit">
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Real Feel</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.feelsLike?.toFixed()} <span className="text-sm font-extralight">° C</span>
                                            </span>
                                            <img src={weatherIcons.thermometer} alt="thermometer" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Wind</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.wind} <span className="text-sm font-extralight">m/s</span>
                                            </span>
                                            <img src={weatherIcons.wind} alt="wind" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Humidity</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.humidity} <span className="text-sm font-extralight">%</span>
                                            </span>
                                            <img src={weatherIcons.humidity} alt="humidity" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Visibility</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.visibility} <span className="text-sm font-extralight">km</span>
                                            </span>
                                            <img src={weatherIcons.fog} alt="Visibility" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Sunrise</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.sunrise}
                                            </span>
                                            <img src={weatherIcons.sunrise} alt="Sunrise" className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="weather-detail-card bg-slate-50 rounded-xl p-2 h-fit">
                                        <span className="text-sm text-neutral-500">Sunset</span>
                                        <div className="flex justify-between mt-2 items-center">
                                            <span className="text-2xl text-black">
                                                {weatherDetails.sunset}
                                            </span>
                                            <img src={weatherIcons.sunset} alt="Sunset" className="w-12 h-12" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DailyForecast
                            lat={lat}
                            lon={lon}
                            city={city}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CurrentWeather;
