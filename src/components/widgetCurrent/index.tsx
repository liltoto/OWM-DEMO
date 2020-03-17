import React from "react";
import "./style.css";

interface ITemps {
  current: number;
  min: number;
  max: number;
  like: number;
}

export interface IWidget {
  city: string;
  temps: ITemps;
  icon: string;
  date: string;
}

const WidgetCurrent = ({ city, temps, icon, date }: IWidget) => (
  <div className="widgetCurrentContainer">
    <div className="widgetCurrentRotatedBox"></div>
    <div className="widgetCurrentTop">
      <div>
        <h3>{city}</h3>
        <p>{date}</p>
      </div>
      <div>
        <span>
          {temps.current}
          °c
        </span>
        <img src={icon} alt="weather icon" />
      </div>
    </div>
    <div className="widgetCurrentBottom">
      <div>
        <p>clear sky</p>
      </div>
      <div>
        <p>
          <strong>Feels like:</strong> {temps.like} °c
        </p>
        <p>
          <strong>Min temp:</strong> {temps.min} °c
        </p>
        <p>
          <strong>Max temp:</strong> {temps.max} °c
        </p>
      </div>
    </div>
  </div>
);

export default WidgetCurrent;
