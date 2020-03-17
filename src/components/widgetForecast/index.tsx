import React from "react";
import "./style.css";

export interface IForecast {
  date: string;
  temps: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
    icon: string;
  };
}

interface IWidgetForecast {
  forecast: IForecast[];
}

const WidgetForecast = ({ forecast }: IWidgetForecast) => (
  <div className="widgetForecastContainer">
    {forecast.map(({ date, temps, weather }) => (
      <div key={date}>
        <p>{date}</p>
        <img src={weather.icon} alt="weather icon"/>
        <p>{temps.min}-{temps.max} °c</p>
      </div>
    ))}
  </div>
);

export default WidgetForecast;
