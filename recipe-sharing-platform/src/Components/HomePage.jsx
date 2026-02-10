import { useState, useEffect } from "react";
import data from "../data.json"

function HomePage() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data)
  }, []);

  return (
    <div>
      <h1>Recipe Collection</h1>

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <img src={recipe.image} alt="RecipePic" />
            <h3>{recipe.title}</h3>
            <p>{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
  
};

export default HomePage;