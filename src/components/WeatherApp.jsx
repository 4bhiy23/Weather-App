import React, { useEffect, useState } from "react";

const WeatherApp = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [city, setCity] = useState("India");
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const search = async (cityName) => {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
      console.log(data); // optional
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className="weather min-w-1/2 max-w-lg mx-auto p-5 bg-gradient-to-b from-[#74ebd5] to-[#ACB6E5] min-h text-center rounded-lg shadow-lg">
      {/* Search bar */}
      <div className="search flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="What's your city?"
          value={city}
          onChange={handleChange}
          className="p-2 w-2/3 rounded-full outline-none bg-white"
        />
        <button onClick={() => search(city)}>
          Search
        </button>
      </div>

      {/* Weather info */}
      {weatherData ? (
        <div className="p-5">
          <h1 className=" text-3xl font-bold">
            {weatherData.location.name}
          </h1>

          <p className="text-8xl">{Math.round(weatherData.current.temp_c)}°</p>
          <div className="flex items-center justify-center mt-2">
            <img src={weatherData.current.condition.icon} alt="" />
            <p className="text-zinc-500 text-2xl text-center">{weatherData.current.condition.text}</p>
          </div>
          
          {/* <div className="flex justify-between">
            <div className="humidity">{weatherData.current.wind_kph}</div>
            <div className="windSpeed">{weatherData.current.wind_kph} km/h</div>
          </div> */}
          
        </div>
      ) : (
        <>
          <h1 className="text-7xl font-bold">404</h1>
          <p>No City with this name was found</p>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
