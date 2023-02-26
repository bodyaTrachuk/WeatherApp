import React from "react";
import "./App.css";
import {IWeatherData} from './Interface'

function App() {
  const [cityName, setCityName] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<IWeatherData>();

  const apiKey = "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const fetchWeatherInfo = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherInfo(res);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='App'>
      <div className='inputs'>
        <input
          type='text'
          onChange={handleChange}
          placeholder='enter the city'
        />
        <input type='button' value='Search' onClick={fetchWeatherInfo} />
      </div>

      {typeof weatherInfo === "undefined" ? (
        <div className='condition'>Empty</div>
      ) : (
        <div className='condition'>
          <div className='condition group_one'>
            {/* city */}
            <p>Weather in {weatherInfo?.name}</p>
            {/* temperature */}
            <p>{weatherInfo?.main.temp} °C</p>
          </div>

          {/* condition */}
          <div className='condition group_two'>
            <img
              src={`http://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
              alt='123'
            />
            <div>
              <p>{weatherInfo?.weather[0].main}</p>
              <p>{weatherInfo?.weather[0].description}</p>
            </div>
          </div>

          <p>Humidity: {weatherInfo?.main.humidity}%</p>
          <p>Wind: {weatherInfo?.wind.speed} m\s</p>
        </div>
      )}
    </div>
  );
}

export default App;
