const dateFns = require("date-fns");

dateFns.format(dateFns.fromUnixTime(1584401565), "eeee, LLLL d, yyyy"); // ?

const data = {
  cod: "200",
  message: 0,
  cnt: 5,
  list: [
    {
      dt: 1584414000,
      main: {
        temp: 3.44,
        feels_like: -1.75,
        temp_min: 3.44,
        temp_max: 4.74,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 1022,
        humidity: 89,
        temp_kf: -1.3
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n"
        }
      ],
      clouds: {
        all: 0
      },
      wind: {
        speed: 4.98,
        deg: 228
      },
      sys: {
        pod: "n"
      },
      dt_txt: "2020-03-17 03:00:00"
    },
    {
      dt: 1584424800,
      main: {
        temp: 3.82,
        feels_like: -2.02,
        temp_min: 3.82,
        temp_max: 4.79,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 1023,
        humidity: 90,
        temp_kf: -0.97
      },
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d"
        }
      ],
      clouds: {
        all: 33
      },
      wind: {
        speed: 6.03,
        deg: 235
      },
      sys: {
        pod: "d"
      },
      dt_txt: "2020-03-17 06:00:00"
    },
    {
      dt: 1584435600,
      main: {
        temp: 5.78,
        feels_like: 0.08,
        temp_min: 5.78,
        temp_max: 6.43,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 1023,
        humidity: 81,
        temp_kf: -0.65
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d"
        }
      ],
      clouds: {
        all: 100
      },
      wind: {
        speed: 5.94,
        deg: 228
      },
      sys: {
        pod: "d"
      },
      dt_txt: "2020-03-17 09:00:00"
    },
    {
      dt: 1584446400,
      main: {
        temp: 7.45,
        feels_like: 0.38,
        temp_min: 7.45,
        temp_max: 7.77,
        pressure: 1024,
        sea_level: 1024,
        grnd_level: 1023,
        humidity: 73,
        temp_kf: -0.32
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d"
        }
      ],
      clouds: {
        all: 97
      },
      wind: {
        speed: 7.93,
        deg: 237
      },
      sys: {
        pod: "d"
      },
      dt_txt: "2020-03-17 12:00:00"
    },
    {
      dt: 1584457200,
      main: {
        temp: 7.87,
        feels_like: 0.16,
        temp_min: 7.87,
        temp_max: 7.87,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 1022,
        humidity: 73,
        temp_kf: 0
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d"
        }
      ],
      clouds: {
        all: 98
      },
      wind: {
        speed: 8.96,
        deg: 243
      },
      sys: {
        pod: "d"
      },
      dt_txt: "2020-03-17 15:00:00"
    }
  ],
  city: {
    id: 2618425,
    name: "Copenhagen",
    coord: {
      lat: 55.6759,
      lon: 12.5655
    },
    country: "DK",
    population: 15000,
    timezone: 3600,
    sunrise: 1584422342,
    sunset: 1584465421
  }
};

const newList = data.list.reduce((prev, current) => {
  const date = dateFns.format(dateFns.fromUnixTime(current.dt), "eee, d");
  if (prev.hasOwnProperty(date)) {
    return {
      ...prev,
      [date]: {
        temps: {
          min:
            current.main.temp_min > prev[date].temps.min
              ? prev[date].temps.min
              : current.main.temp_min,
          max:
            current.main.temp_max < prev[date].temps.max
              ? prev[date].temps.max
              : current.main.temp_max
        },
        weather: {
          id:
            prev[date].weather.id > current.weather[0].id
              ? current.weather[0].id
              : prev[date].weather.id,
          icon:
            prev[date].weather.id > current.weather[0].id
              ? current.weather[0].icon
              : prev[date].weather.icon
        }
      }
    };
  } else {
    return {
      ...prev,
      [date]: {
        temps: {
          min: current.main.temp_min,
          max: current.main.temp_max
        },
        weather: {
          id: current.weather[0].id,
          icon: current.weather[0].icon
        }
      }
    };
  }
}, {});

JSON.stringify(newList, null, 2); // ?
