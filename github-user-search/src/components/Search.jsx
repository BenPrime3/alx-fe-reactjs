import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    
    if (query.trim !== "") {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <input type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Github Users"
      />

      <button type="submit">Search</button>
    </form>
  )
};

export default Search;