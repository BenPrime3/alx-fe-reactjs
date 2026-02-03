import { useState } from "react";
import fetchUserData from "../services/githubService";


const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setQuery("");

    
    
    if (query.trim() !== "") {

      setLoading(true);
      setError("")
      
      try {
        const data = await fetchUserData(query.trim());
        setUser(data);
      }
      catch (error) {
        setError("Looks like we cant find the user");
      }
      finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Github Users"
        />

        <button type="submit">Search</button>
      </form>
      
      {loading && <p>Loading</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} />
          <div>
            <h2>{user.name || user.login}</h2>
            <p>Username: {user.login}</p>
            <p>Followers: {user.followers} || Following: {user.following}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer"> View Profile</a>
          </div>
        </div>
      )}
      
    </div>
  )
};

export default Search;