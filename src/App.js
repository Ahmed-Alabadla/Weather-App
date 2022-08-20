import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import weather from "./assets/weather.png";
import API_axios from "./API_axios";

const API_KEY = "34482fe2681d8b2d5b169cc781115b7e";

class App extends Component {
  state = {
    city: "",
    country: "",
    description: "",
    temperature: "",
    humidity: "",
    icon: "",
    error: "none",
    display: "none",
    input: "",
  };
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.children.city.value;

    const api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await api.json();
    // console.log(data);

    if (city.length > 0) {
      if (data.cod === 200) {
        this.setState({
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          icon: data.weather[0].icon,
          error: "none",
          display: "flex",
          input: "",
        });
      } else {
        this.setState({
          city: "",
          country: "",
          description: "",
          temperature: "",
          humidity: "",
          speed: "",
          error: "block",
          display: "none",
          input: city,
        });
      }
    } else {
      e.preventDefault();
    }

    e.target.reset();
  };

  render() {
    return (
      <div className="container weather text-center">
        <h1 className="heading">Weather App</h1>
        <form
          className="d-flex mx-auto search"
          role="search"
          onSubmit={this.getWeather}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Enter a City"
            aria-label="Search"
            name="city"
          />
          <button className="btn btn-secondary" type="submit">
            Search
          </button>
        </form>

        <div
          className={`city d-${this.state.display} flex-column align-items-center justify-content-center mx-auto`}
        >
          <img src={weather} className="img mb-4" />
          <div className="h2 city-name">
            <span>{this.state.city}</span>
            <sup>{this.state.country}</sup>
          </div>
          <div className="city-temp">
            {Math.round(this.state.temperature - 273.15)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
              alt={this.state.description}
            />
            <p>{this.state.description}</p>
          </div>
        </div>
        <div className={`city d-${this.state.error} mx-auto text-center`}>
          <h1 className="text-danger">{this.state.input} : City not found</h1>
        </div>

        <API_axios />
      </div>
    );
  }
}

export default App;
