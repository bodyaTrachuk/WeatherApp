import React from "react";
import "./App.css";
import { IWeatherData } from "./Interface";
import { gsap, Power3 } from "gsap";

function App() {
  const [cityName, setCityName] = React.useState<string>("");
  const [weatherInfo, setWeatherInfo] = React.useState<IWeatherData>();

  let group_one = React.useRef<HTMLDivElement>(null);
  let group_two = React.useRef<HTMLDivElement>(null);
  let Humidity = React.useRef<HTMLParagraphElement>(null);
  let Wind = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    gsap.from(group_one.current, 1, {
      opacity:0,
      y: -100,
      ease: Power3.easeInOut,
      delay: 0.5,
    });
    gsap.from(group_two.current, 1, {
      opacity:0,
      y: -100,
      ease: Power3.easeInOut,
      delay: 1,
    });
    gsap.from(Humidity.current, 1, {
      opacity:0,
      y: -100,
      ease: Power3.easeInOut,
      delay: 1.5,
    });
    gsap.from(Wind.current, 1, {
      opacity:0,
      y: -100,
      ease: Power3.easeInOut,
      delay: 2,
    });
  }, [weatherInfo]);

  const apiKey = "a47381c6706fff1f8b5b1ba8ed43a59f";

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
      <p className='title'>
        Weather App
      </p>
      <div className='inputs'>
        <input
          type='text'
          onChange={handleChange}
          placeholder='enter the city'
        />
        <input type='button' value='Search' onClick={fetchWeatherInfo} />
      </div>

      {typeof weatherInfo === "undefined" ? (
        <div className='condition'></div>
      ) : (
        <div className='condition'>
          <div className='condition group_one' ref={group_one}>
            {/* city */}
            <p>Weather in {weatherInfo?.name}</p>
            {/* temperature */}
            <p>{weatherInfo?.main.temp} °C</p>
          </div>

          {/* condition */}
          <div className='condition group_two' ref={group_two}>
            <img
              src={`http://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
              alt='123'
            />
            <div>
              <p>{weatherInfo?.weather[0].main}</p>
              <p>{weatherInfo?.weather[0].description}</p>
            </div>
          </div>

          <p className='Humidity' ref={Humidity}>
            Humidity: {weatherInfo?.main.humidity}%
          </p>
          <p className='Wind' ref={Wind}>
            Wind: {weatherInfo?.wind.speed} m\s
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
