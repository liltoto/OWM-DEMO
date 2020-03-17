import { format, fromUnixTime } from "date-fns";
import { IForecast } from "../components/widgetForecast";
import { IWidget } from "../components/widgetCurrent";

interface IState {
  city: string;
  error: {
    code: number | undefined;
    message: string | undefined;
  };
  current: IWidget;
  forecast: IForecast[];
}

export type Types =
  | "FETCH_CURRENT_WEATHER"
  | "FETCH_FAILED"
  | "FETCH_FORECAST"
  | "UPDATE_CITY";

export interface IAction {
  type: Types;
  payload: {
    [key: string]: any;
  };
}

const currentCity = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("query")) return urlParams.get("query")!;
  return "copenhagen";
};

export const initialState: IState = {
  city: currentCity(),
  error: {
    code: undefined,
    message: undefined
  },
  current: {
    date: "",
    city: "",
    temps: {
      current: 0,
      like: 0,
      max: 0,
      min: 0
    },
    icon: ""
  },
  forecast: []
};

const roundUp = (value: number): number => (value ? Math.round(value) : 0);

const reduceForecast = (data: any): IForecast[] => {
  const currentDate = format(new Date(), "eee, d");
  const listObject = data.list.reduce((prev: any, current: any) => {
    const date = format(fromUnixTime(current.dt), "eee, d");
    if (date === currentDate) return prev;
    if (prev.hasOwnProperty(date)) {
      return {
        ...prev,
        [date]: {
          temps: {
            min:
              current.main.temp_min > prev[date].temps.min
                ? prev[date].temps.min
                : roundUp(current.main.temp_min),
            max:
              current.main.temp_max < prev[date].temps.max
                ? prev[date].temps.max
                : roundUp(current.main.temp_max)
          },
          weather: {
            id:
              prev[date].weather.id > current.weather[0].id
                ? current.weather[0].id
                : prev[date].weather.id,
            icon:
              prev[date].weather.id > current.weather[0].id
                ? `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`
                : prev[date].weather.icon
          }
        }
      };
    } else {
      return {
        ...prev,
        [date]: {
          temps: {
            min: roundUp(current.main.temp_min),
            max: roundUp(current.main.temp_max)
          },
          weather: {
            id: current.weather[0].id,
            icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`
          }
        }
      };
    }
  }, {});

  return Object.keys(listObject)
    .map((value: string) => ({
      ...listObject[value],
      date: value
    }))
    .slice(0, 5);
};

export const currentWeatherReducer = (
  state: IState,
  action: IAction
): IState => {
  switch (action.type) {
    case "FETCH_CURRENT_WEATHER":
      return {
        ...state,
        error: {
          code: undefined,
          message: undefined
        },
        current: {
          city: action.payload?.name,
          date: format(fromUnixTime(action.payload?.dt), "eeee, LLLL d, yyyy"),
          temps: {
            current: roundUp(action.payload?.main?.temp),
            min: roundUp(action.payload?.main?.temp_min),
            max: roundUp(action.payload?.main?.temp_max),
            like: roundUp(action.payload?.main?.feels_like)
          },
          icon: `http://openweathermap.org/img/wn/${action.payload?.weather[0]?.icon}@2x.png`
        }
      };
    case "FETCH_FORECAST":
      return {
        ...state,
        error: {
          code: undefined,
          message: undefined
        },
        forecast: reduceForecast(action.payload)
      };
    case "FETCH_FAILED":
      const { code, message } = action.payload;
      return {
        ...state,
        error: {
          code,
          message
        }
      };
    case "UPDATE_CITY":
      return {
        ...state,
        city: action.payload.city
      };
    default:
      return state;
  }
};
