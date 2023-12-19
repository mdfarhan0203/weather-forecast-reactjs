import React, { useState } from "react";

const apiKey = "324be0d391437b1f0493ea8d8fa50b58";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function getWeatherInfo(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const result = await response.json();
      if (result.cod == 200) {
        setWeatherData(result);
        setError(null);
      } else {
        setError(result.message + " Try Again");
        setWeatherData(null);
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  }

  const searchHandler = async () => {
    await getWeatherInfo(city);
    setCity("");
  };

  return (
    <div className="App">
      <div className="card">
        <div className="inbut-box">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Place Name"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-btn" onClick={searchHandler}>
            <img src="./images/search.png" alt="search icon" />
          </button>
        </div>

        {/* if city Name is wrong  */}
        {error && (
          <div className="weather">
            <p className="error">{error}</p>
          </div>
        )}

        {/* If Weather  Data   if there */}
        {weatherData && (
          <div className="weather">
            <img
              src={`./images/${weatherData.weather[0].main}.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <h1 className="temp">{Math.round(weatherData.main.temp)} °C</h1>
            <h2 className="city-name">{weatherData.name}</h2>

            <div className="details">
              <div className="col">
                <img src="./images/humidity.png" />
                <div>
                  <p className="humidity">{weatherData.main.humidity}</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="./images/wind.png" />
                <div>
                  <p className="wind">{weatherData.wind.speed} KM/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="desc">{weatherData.weather[0].description}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
