import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => r.id === Number(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <p>Loading recipe...</p>;

  return (
    <div className="flex flex-col justify-center justify-self-center mt-10 text-center shadow-xl p-16 rounded-lg">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.title} />

      <h2 className="font-bold text-xl p-6 pb-2">Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="font-bold mt-6 mb-2">Instructions</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
