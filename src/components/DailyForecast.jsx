import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import weatherIcons from '../assets/weatherIcons';


const DailyForecast = ({ lat, lon, city }) => {

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const [weatherDetails, setWeatherDetails] = useState({});

    const fetchData = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&cnt=16&units=metric`
            );
            console.log('farecast', response);
            setWeatherDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('lat', lat);
        fetchData(lat, lon);
    }, []);

    useEffect(() => {
        onLocationChange(city);
    }, [city])

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const onLocationChange = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&cnt=16&units=metric`
            );
            console.log('forecast', response);
            setWeatherDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
            .format(date)
            .toUpperCase();
        const monthDay = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' })
            .format(date);
        return { weekday, monthDay };
    }

    return (
        <div className='mt-8 bg-slate-200 p-2 rounded-xl'>
            <h2 className='font-semibold text-xl my-4 ml-3'>Daily <span className='font-extralight'> Forecast </span></h2>
            <div className='rounded-xl p-2'>
                <div className=''>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto border-r-2">
                            <tbody>
                                {weatherDetails.list &&
                                    weatherDetails.list.map((weather, index) => {
                                        return (
                                            <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                                    <div className='text-center'>
                                                        <span className='text-lg font-semibold '>
                                                            {formatTimestamp(weather.dt).weekday}
                                                        </span>
                                                        <br />
                                                        <span className='text-xs font-light'>
                                                            {formatTimestamp(weather.dt).monthDay}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <img src={weatherIcons[weather.weather[0].icon]} alt='weather icon' className='w-14 h-14 min-w-14 min-h-14' />

                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className='text-lg font-semibold'>
                                                        {weather.weather[0].main}
                                                    </span>
                                                    <br />
                                                    <span className='text-xs font-light'>
                                                    {capitalizeFirst(weather.weather[0].description)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <div className='flex flex-nowrap items-center'>
                                                        <img src={weatherIcons.thermometer} alt='thermometer' className='w-8 h-8' />
                                                        <span className='text-lg font-semibold'>
                                                            {weather.temp.max.toFixed()}°
                                                        </span>
                                                        &nbsp;&nbsp;
                                                        <span className='text-lg font-light'>
                                                            {weather.temp.min.toFixed()}°
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <div className='flex flex-nowrap items-center'>
                                                        <img src={weatherIcons.humidity} alt='humidity' className='w-8 h-8' />
                                                        <span className='text-md font-light'>
                                                            {weather.humidity.toFixed()}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default DailyForecast
