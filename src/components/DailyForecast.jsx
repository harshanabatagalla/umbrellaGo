import React, { useEffect, useState } from 'react';
import axios from 'axios';
import weatherIcons from '../assets/weatherIcons';
import DetailedWeather from './DetailedWeather';

const DailyForecast = ({ lat, lon, city }) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const [weatherDetails, setWeatherDetails] = useState({});
    const [showAllRows, setShowAllRows] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWeather, setSelectedWeather] = useState(null);

    const fetchData = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&cnt=16&units=metric`
            );
            setWeatherDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(lat, lon);
    }, [lat, lon]);

    useEffect(() => {
        if (city) {
            onLocationChange(city);
        }
    }, [city]);

    const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const onLocationChange = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&cnt=16&units=metric`
            );
            setWeatherDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
            .format(date)
            .toUpperCase();
        const monthDay = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' })
            .format(date);
        return { weekday, monthDay };
    };

    const showDetailedWeather = (weather) => {
        setSelectedWeather(weather);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedWeather(null);
        setIsModalOpen(false);
    };

    return (
        <div className='mt-8 bg-slate-200 p-2 rounded-xl'>
            <h2 className='font-semibold text-xl my-4 ml-3'>
                Daily <span className='font-extralight'>Forecast</span>
            </h2>
            <div className="relative overflow-x-auto w-full px-2 rounded-xl">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto border-r-2">
                    <tbody>
                        {weatherDetails.list &&
                            weatherDetails.list
                                .slice(0, showAllRows ? weatherDetails.list.length : 5)
                                .map((weather, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={() => showDetailedWeather(weather)}
                                    >
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
                                        <td className="px-6 py-4 sm:table-cell hidden">
                                            <span className='text-lg font-semibold'>
                                                {weather.weather[0].main}
                                            </span>
                                            <br />
                                            <span className='text-xs font-light'>
                                                {capitalizeFirst(weather.weather[0].description)}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <div className='flex flex-nowrap items-end'>
                                                <img src={weatherIcons.thermometer} alt='thermometer' className='w-10 h-10 sm:table-cell hidden' />
                                                <span className='text-3xl font-semibold'>
                                                    {weather.temp.max.toFixed()}°
                                                </span>
                                                &nbsp;&nbsp;
                                                <span className='text-lg font-light'>
                                                    {weather.temp.min.toFixed()}°
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 sm:table-cell hidden">
                                            <div className='flex flex-nowrap items-center'>
                                                <img src={weatherIcons.humidity} alt='humidity' className='w-8 h-8' />
                                                <span className='text-md font-light'>
                                                    {weather.humidity.toFixed()}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
                {weatherDetails.list && weatherDetails.list.length > 5 && (
                    <div className='text-right mt-2'>
                        <button
                            onClick={() => setShowAllRows(!showAllRows)}
                            className='text-blue-500 hover:underline text-sm font-semibold'
                        >
                            {showAllRows ? 'See Less' : 'See More...'}
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && selectedWeather && (
                <DetailedWeather open={isModalOpen} weather={selectedWeather} onClose={closeModal} />
            )}

        </div>
    );
};

export default DailyForecast;
