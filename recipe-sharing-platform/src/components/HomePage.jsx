import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

function HomePage() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data)
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl font-extrabold my-9 mb-20">Recipe Collection</h1>

      <div className="grid gap-16 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">

        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>

            <div className="bg-slate-400 w-52 p-6 rounded-lg hover:shadow-xl hover:scale-105 2xl:transition duration-500">
            <img src={recipe.image} alt="RecipePic" />
            <h3 className="font-bold">{recipe.title}</h3>
            <p>{recipe.summary}</p>
          </div>

          </Link>
        ))}

      </div>
    </div>
  )
  
};

export default HomePage;