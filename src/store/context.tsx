import React, { useReducer, createContext, useEffect, Dispatch } from "react";
import { initialState, IAction, currentWeatherReducer } from "./reducer";

const StoreContext = createContext({
  ...initialState,
  updateCity: (name: string) => {}
});

const failed = (data: any) =>
  data?.cod === "404" || data?.cod === 429 || data?.cod === 401;

const fetchData = (dispatch: Dispatch<IAction>, city: string) => {
  const fetchedData = async (): Promise<void> => {
    try {
      const currentWeather = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_TOKEN}`
        )
      ).json();
      if (failed(currentWeather)) {
        const { cod, message } = currentWeather;
        return dispatch({
          type: "FETCH_FAILED",
          payload: { code: cod, message }
        });
      }
      const forecastWeather = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_TOKEN}`
        )
      ).json();
      if (failed(forecastWeather)) {
        const { cod, message } = forecastWeather;
        return dispatch({
          type: "FETCH_FAILED",
          payload: { code: cod, message }
        });
      }
      dispatch({ type: "FETCH_CURRENT_WEATHER", payload: currentWeather });
      return dispatch({ type: "FETCH_FORECAST", payload: forecastWeather });
    } catch (e) {
      return dispatch({
        type: "FETCH_FAILED",
        payload: { code: 404, message: "oops something went wrong!" }
      });
    }
  };
  fetchedData();
};

const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(currentWeatherReducer, initialState);

  useEffect(() => {
    fetchData(dispatch, state.city);
  }, [state.city]);

  const updateCity = (name: string) => {
    dispatch({ type: "UPDATE_CITY", payload: { city: name } });
  };

  return <StoreContext.Provider value={{ ...state, updateCity }} {...props} />;
};

export { StoreContext, StoreProvider };
