import React, { useRef, useContext, FormEvent } from "react";
import { StoreContext } from "../../store";
import "./style.css";

const currentCity = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("query")) return urlParams.get("query")!;
  return "copenhagen";
};

const SearchBar = () => {
  const store = useContext(StoreContext);
  const inputRef = useRef<HTMLInputElement>(null);

  window.onpopstate = () => {
    store.updateCity(currentCity());
  };

  const onSubmitHandler = (event: FormEvent) => {
    const {
      history,
      location: { protocol, host, pathname }
    } = window;
    if (inputRef.current?.value) {
      const { value } = inputRef.current;
      const newurl = `${protocol}//${host}${pathname}?query=${value}`;
      store.updateCity(value);
      history.pushState({ path: newurl }, "", newurl);
      inputRef.current.value = "";
    }
    event.preventDefault();
  };

  return (
    <form className="searchBarContainer" onSubmit={onSubmitHandler}>
      <input ref={inputRef} type="text" name="search" placeholder="search..." />
    </form>
  );
};

export default SearchBar;
