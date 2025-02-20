import React from "react";
import "./Search.css";
import { BsSearch } from "react-icons/bs";

interface SearchProps {
  setSearchTerm: (newTerm: string) => void;
}

function Search({ setSearchTerm }: SearchProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      search: { value: string };
    };
    setSearchTerm(target.search.value);
  };

  return (
    <form role="search" onSubmit={onSubmit}>
      <input
        type="search"
        role="searchbox"
        aria-description="search results will appear below"
        id="search"
        placeholder="  "
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="search">Search for movies</label>
      <button aria-label="Submit Search">
        <BsSearch aria-hidden="true" />
      </button>
    </form>
  );
}

export default Search;
