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
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

      <form onSubmit={handleSubmit} style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <input type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Github Users..."
          style={{width: "100%", height: "40px", backgroundColor: "#242424", 
          borderRadius:"10px", border: "1px solid white", textAlign: "center", marginBottom: "40px"}}
        />

        <button type="submit">Search</button>
      </form>
      
      {loading && <p>Loading</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {user && (
        <div style={{display: "flex", flexDirection: "column", backgroundColor: "#343434", padding: "30px", marginTop: "40px", borderRadius: "20px"}}>
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