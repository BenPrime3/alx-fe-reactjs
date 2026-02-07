import { useState } from "react";
import fetchUserData from "../services/githubService";
import axios from "axios";


const Search = ({ onSearch }) => {
  const [form, setForm] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [find, setFind] = useState(false)
  const [error, setError] = useState("");
  const buildQuery = (form) => {
  let queryParts = [];

  if (form.username) {
    queryParts.push(form.username);
  }

  if (form.location) {
    queryParts.push(`location:${form.location}`);
  }

  if (form.minRepos) {
    queryParts.push(`repos:>${form.minRepos}`);
  }

  return queryParts.join(" ");
};


  const handleChange = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (form.username || form.location || form.minRepos) {

      setLoading(true);
      setFind(true)
      setError("")
      
      try {
        const queryString = buildQuery(form);
        const data = await fetchUserData(queryString);

        const detailedUsers = await Promise.allSettled(
          data.items.map(async (user) => {

            try {
              const res = await axios.get(user.url, {
                headers: { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` },
              });
              return res.data;
            }
            catch {
              return null;
            }

          })
        );

        setUsers(
          detailedUsers.filter(r => r.status === "fulfilled" && r.value !== null).map(r => r.value)
        );

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
    <>
    <div className="flex-col p-8">

      <form onSubmit={handleSubmit} style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", gap:"2rem"}}>
        <input
          name="username"
          className="text-center text-muted p-4 w-full max-w-xs h-7 border-muted border-solid border border-l-4 rounded-sm outline-none focus:border-primary focus:text-primary transition duration-500"
          type="text"
          onChange={handleChange}
          placeholder="Username..."
        />

        <input
          name="location"
          className="text-center text-muted p-4 w-full max-w-xs h-7 border-muted border-solid border border-l-4 rounded-sm outline-none focus:border-primary focus:text-primary transition duration-500"
          type="text"
          onChange={handleChange}
          placeholder="Location..."
        />

        <input
          name="minRepos"
          className="text-center text-muted p-4 w-full max-w-xs h-7 border-muted border-solid border border-l-4 rounded-sm outline-none focus:border-primary focus:text-primary transition duration-500"
          type="number"
          onChange={handleChange}
          placeholder="Minimum Number of Repos"
        />

        <button type="submit"
          className="bg-primary px-5 py-1 text-white font-bold rounded-sm cursor-auto"
        >
          Search
        </button>
      </form>
    </div>
      
    <div className="flex justify-center">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

    <div className="flex-row flex flex-wrap gap-10 justify-center">

      {users.length === 0 && !loading && !error && find && (<p>Couldn't Find Any Users</p>)}
      
      {users.length > 0 && users.map((user) => (

          <div key={user.id} style={{ display: "flex", flexDirection: "column", backgroundColor: "#343434", padding: "30px", marginTop: "40px", borderRadius: "20px", maxWidth:"300px"}}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <h2>{user.name || user.login}</h2>
              <p>Username: {user.login}</p>
              <p>Followers: {user.followers} || Following: {user.following}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer"> View Profile</a>
            </div>
          </div>
      ))}
      
    </div>
  </>
  )

};

export default Search;