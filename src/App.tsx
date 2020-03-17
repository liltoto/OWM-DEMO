import React from "react";
import { StoreContext, StoreProvider } from "./store";
import WidgetCurrent from "./components/widgetCurrent";
import WidgetForecast from "./components/widgetForecast";
import SearchBar from "./components/searchBar";
import Error from "./components/error";

const App = () => (
  <StoreProvider>
    <StoreContext.Consumer>
      {({ error, current: { date, city, temps, icon }, forecast }) => (
        <>
          <SearchBar />
          {!error.code && (
            <div className="center">
              <div>
                <WidgetCurrent
                  date={date}
                  city={city}
                  temps={temps}
                  icon={icon}
                />
                <WidgetForecast forecast={forecast} />
              </div>
            </div>
          )}
          {error.code && error.message && (
            <div className="center">
              <Error code={error.code} message={error.message} />
            </div>
          )}
        </>
      )}
    </StoreContext.Consumer>
  </StoreProvider>
);

export default App;
