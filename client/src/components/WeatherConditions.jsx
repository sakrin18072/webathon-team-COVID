import React, { useState } from "react";
import Layout from "./Layout/Layout";
import axios from "axios";
const WeatherConditions = () => {
  const [req, setReq] = useState("");
  const[answer,setAnswer] = useState({});
  const [loading,setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
      params: { city: req },
      headers: {
        "X-RapidAPI-Key": "cb5e99480amsh4eadd7bb7181b97p18b2bcjsn45652b2586d0",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAnswer(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <Layout>
      <div className="container w-50 m-3 mx-auto">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Enter the city name"
            aria-label="Search"
            value={req}
            onChange={(e) => {
              setReq(e.target.value);
            }}
          />
          <button
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            type="submit"
          >
            Search
          </button>
        </form>

        <h2 className="m-5 p-5">Weather Details</h2>
        {loading?"Loading...":
        <div className="container ms-auto rounded">
            <h4>Cloudiness: {answer?.cloud_pct}</h4>
            <h4>Feels like: {answer?.feels_like}&#176; C</h4>
            <h4>Humidity: {answer?.humidity}</h4>
            <h4>Maximum temperature: {answer?.max_temp}&#176; C</h4>
            <h4>Minimum temperature: {answer?.min_temp}&#176; C</h4>
            <h4>Temperature: {answer?.temp}&#176; C</h4>
            <h4>Wind degree: {answer?.wind_degrees}&#176;</h4>
            <h4>Wind speed: {answer?.wind_speed}</h4>
        </div>
        
        }
      </div>
    </Layout>
  );
};

export default WeatherConditions;
