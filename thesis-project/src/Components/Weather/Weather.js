import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";

const Weather = ({ config }) => {
  // console.log("Render commandInput:", commandInput);
  const weatherLocationJSON = config.City || "Whitby, Canada";

  const [weatherLocation, setWeatherLocation] = useState("Whitby, Canada");
  const [weatherPrompt, setWeatherPrompt] = useState("");
  // const [details, setWeatherDetails] = useState("CONDITION");
  const [details, setWeatherDetails] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(null);
  const myRef = useRef(null);

  // Update weather whenever prompt args are changed
  useEffect(() => {
    // console.log("Inside Weather useEffect");
    // console.log("config:", config);
    // console.log("config.City:", config && config.City);
    if (config && config.City) {
      getWeather(config.City); // fetch weather for the provided city in config
    }
  }, [config]);

  //Get appropriate weather icon relative to current condition
  const getWeatherIcon = (details) => {
    console.log("AH", details.split(",")[1]);

    Papa.parse("./Assets/weather_conditions.csv", {
      download: true,
      header: true,
      complete: function (data) {
        // Assuming the CSV has columns 'day', 'night', and 'icon'
        const condition = details.split(",")[1]; // or "Sunny" or "Clear"

        const matchedRow = data.data.find(
          (row) => row.day === condition || row.night === condition
        );
        if (matchedRow) {
          if (matchedRow.day === condition) {
            setWeatherIcon(`day/${matchedRow.icon}`);
          } else if (matchedRow.night === condition) {
            setWeatherIcon(`night/${matchedRow.icon}`);
          }
        }
        console.log(weatherIcon);
      },
    });
  };
  // Check if component was called
  // useEffect(() => {
  //   if (typeof config === "string" && config != null) {
  //     // commandInput = commandInput.split(",");
  //     config = config.split("||");
  //     if (config[0] === "Weather: Field Input") {
  //       myRef.current.scrollIntoView({ behavior: "smooth" });
  //       getWeather(config[1]);
  //       setWeatherPrompt(config[2]);
  //     }
  //   }
  // }, [config]);

  const getWeather = async (location) => {
    console.log(location);
    setWeatherPrompt(location);
    try {
      const weather = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=51509e72d17040d0854123928231809&q=" +
          location +
          "&aqi=no"
      );
      const weatherResponse = await weather.json();
      // console.log(weatherResponse["location"]);
      // console.log(weatherResponse["current"]["temp_c"]);
      // console.log(weatherResponse["current"]["condition"]["text"]);
      setWeatherLocation(
        weatherResponse["location"]["name"] +
          "," +
          weatherResponse["location"]["country"]
      );
      setWeatherDetails(
        weatherResponse["current"]["temp_c"] +
          "," +
          weatherResponse["current"]["condition"]["text"]
      );
      getWeatherIcon(
        weatherResponse["current"]["temp_c"] +
          "," +
          weatherResponse["current"]["condition"]["text"]
      ); // fetch weather icon for current condition
    } catch (err) {
      console.log("Error getting weather data");
    }
  };

  return (
    <div ref={myRef} className="weather_section">
      <h1 className="app_title">WEATHER</h1>
      <h2>
        {weatherLocation.split(",")[0]
          ? weatherLocation.split(",")[0].toUpperCase()
          : ""}
      </h2>
      <h5>
        {weatherLocation.split(",")[1]
          ? weatherLocation.split(",")[1].toUpperCase()
          : ""}
      </h5>
      <h2 className="temperature">
        {details.split(",")[0] ? details.split(",")[0].toUpperCase() : ""}
      </h2>
      <h3 className="condition">
        {details.split(",")[1] ? details.split(",")[1].toUpperCase() : ""}
      </h3>
      <input
        type="text"
        value={weatherPrompt}
        onChange={(e) => getWeather(e.target.value)}
        placeholder="Enter Location"
      />
      <div className="weather_icon">
        <img
          className="glow_icon_first"
          src={
            weatherIcon ? `/Assets/weatherIcons/64x64/${weatherIcon}.png` : null
          }
          alt={weatherIcon}
        />
        <img
          className="glow_icon_second"
          src={
            weatherIcon ? `/Assets/weatherIcons/64x64/${weatherIcon}.png` : null
          }
          alt={weatherIcon}
        />
      </div>
    </div>
  );
};

export default Weather;
