import axios from "axios";
import React, { useState } from "react";
import "./WApp.css";

const WApp = () => {
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState(true);
  const [data, setData] = useState();
  const [feelslike, setFeelslike] = useState();
  const [cityname, setCityname] = useState();
  const [pressure, setPressure] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [country, setCountry] = useState();
  const [description, setDescription] = useState();
  let [time, setTime] = useState(null);
  const [temper, setTemper] = useState();
  time = new Date().toLocaleTimeString();
  const apiKey = "f2555169b342ea97e75462c066826773";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const onChangeInhutHandler = (e) => {
    setLocation(e.target.value);
    console.log(location);
  };
  const onClickSearchButton = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response);
      setCityname(response.data.name);
      setTemper(Math.floor(response.data.main.temp));
      setFeelslike(Math.floor(response.data.main.feels_like));
      setInputValue(false);
      setPressure(response.data.main.pressure); //      humidity
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setCountry(response.data.sys.country);
      setDescription(response.data.weather[0].description);
    });
  };
  const styleHeading = {
    fontSize: "30px",
    textAlign: "center",
    color: " rgb(9, 0, 140)",
  };

  return (
    <div className="App">
      <div style={styleHeading}>Weather App</div>

      {inputValue && (
        <div className="styleinput">
          <input
            value={location}
            onChange={onChangeInhutHandler}
            placeholder="Enter Location"
            type="text"
          />
          <button onClick={() => onClickSearchButton()}>search</button>
        </div>
      )}

      {data && (
        <div className="container">
          <span>Current Weather in </span>
          <span className="stylecityname">{cityname}</span>
          <span className="time">{time}</span>
          <hr></hr>
          <div className="card-detail">
            <div className="image-temp">
              <img src="weather/download.jpg " alt="weatherPhoto"></img>
              <span className="bigAndBold">
                {temper}°<span className="celsius">C</span>
              </span>
              <div className="feellike">Real feels: {feelslike}°c</div>
              <span className="climate"> {description} </span>
            </div>
            <div className="detailsweather">
              <span>Country-Name: </span>
              <span style={{ color: "crimson", fontWeight: "bold" }}>
                {country}
              </span>
              <hr></hr>
              <div>Presure: {pressure}</div>
              <hr></hr>
              <div>Humidity: {humidity}%</div>
              <hr></hr>
              <div>Wind: {wind} MPH</div>
              <hr></hr>
              <div>Climate: {description} </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WApp;
