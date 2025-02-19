import React from "react";
import "./Search.css";
import { BsSearch } from "react-icons/bs";

function Search() {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hit it!");
  };

  return (
    <form role="search" onSubmit={onSubmit}>
      <input
        type="search"
        role="searchbox"
        aria-description="search results will appear below"
        id="search"
        placeholder="  "
      />
      <label htmlFor="search">Search for movies</label>
      <button aria-label="Submit Search">
        <BsSearch aria-hidden="true" />
      </button>
    </form>
  );
}

export default Search;
