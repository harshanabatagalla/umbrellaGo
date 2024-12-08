import React from 'react';
import weatherIcons from '../assets/weatherIcons'; // Assuming you have weatherIcons mapping

const DetailedWeather = ({ open, weather, onClose }) => {
    if (!open || !weather) return null;

    const {
        dt,
        sunrise,
        sunset,
        temp,
        feels_like,
        pressure,
        humidity,
        weather: weatherInfo,
        speed,
        gust,
        deg,
        clouds,
        pop, // Probability of precipitation
        rain, // Rain volume
    } = weather;

    const date = new Date(dt * 1000).toLocaleDateString();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(dt * 1000));
    const description = weatherInfo[0]?.description || 'No description available';

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-2 border-b rounded-t">
                    <div>
                        <span className="text-lg font-semibold text-gray-800">{weekday}</span> <br />
                        <span className="text-sm font-light text-gray-800">{date}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Weather Summary Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center mb-6 p-4 rounded-lg">
                    <div className='flex items-center sm:justify-normal justify-between'>
                        <img
                            src={weatherIcons[weatherInfo[0]?.icon]}
                            alt="Weather Icon"
                            className="w-20 h-20"
                        />
                        <div className="ml-4">
                            <p className="text-4xl font-bold text-gray-800">{temp.max.toFixed()}°</p>
                            <p className="text-md text-gray-600 capitalize font-light">{description}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between sm:ml-10 font-light sm:mt-0 mt-4'>
                        <p className="text-gray-700">
                            Real Feel &nbsp;{feels_like.day.toFixed()}°
                        </p>
                        <p className="text-gray-700">
                            Real Feel Night &nbsp;{feels_like.night.toFixed()}°
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 mb-6 gap-0">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-700 font-light">
                            <tbody>
                                <tr class="bg-white border-b border-t">
                                    <td class="px-2 py-4">
                                        Wind
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {speed.toFixed()} km/h
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Wind Gust
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {gust?.toFixed() || 0} km/h
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Wind Direcrion
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {deg}°
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Pressure
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {pressure} hPa
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Probability of Precipitation
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {(pop * 100).toFixed()}%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-700 font-light">
                            <tbody>
                                <tr class="bg-white border-b border-t">
                                    <td class="px-2 py-4">
                                        Rain
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {rain || 0} mm
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Cloud
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {clouds}%
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Humidity
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {humidity}%
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Sunrise
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {formatTime(sunrise)}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="px-2 py-4">
                                        Sunset
                                    </td>
                                    <td class="px-2 py-4 text-right">
                                        {formatTime(sunset)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedWeather;
