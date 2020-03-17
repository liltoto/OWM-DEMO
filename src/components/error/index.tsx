import React from "react";
import "./style.css";

interface IError {
  code: string | number;
  message: string;
}

const Error = ({ code, message }: IError) => (
  <div className="errorContainer">
    <h1>{code}</h1>
    <p>{message}</p>
  </div>
);

export default Error;
