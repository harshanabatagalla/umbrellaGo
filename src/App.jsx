import React from 'react'
import CurrentWeather from './components/currentWeather'

export default function App() {
  return (
    <>
      <div class="background-image"></div>
      <div class="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <h1 className='text-lg md:text-xl lg:text-2xl font-semibold text-right mt-4'>
        <span className='bg-slate-50 px-2 rounded-md'>
          <span className='text-neutral-500'>Umbrella</span>
          <span className='text-[#FFA500] '>Go</span>
        </span>
        </h1>
        <CurrentWeather />
      </div>
    </>
  )
}
//ffc107