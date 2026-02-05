import axios from "axios";


const fetchUserData = async (query) => {

    const encodedQuery = encodeURIComponent(query);
    
    const response = await axios.get(`https://api.github.com/search/users?q=${encodedQuery}&per_page=10`, 
        {
            headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
            }
        }
    );

    return response.data;
  
};

export default fetchUserData;
