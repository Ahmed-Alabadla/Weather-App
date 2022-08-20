import React, { Component } from "react";
import axios from "axios";

class API_axios extends Component {
  componentDidMount() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=gaza&appid=34482fe2681d8b2d5b169cc781115b7e"
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    return <></>;
  }
}

export default API_axios;
