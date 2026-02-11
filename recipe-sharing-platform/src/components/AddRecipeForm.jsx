import { useState } from "react";

function AddRecipeForm({ addRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!title || !ingredients || !steps) {
    setError("All fields are required.");
    return;
  }

  const ingredientList = ingredients
    .split("\n")
    .filter((item) => item.trim() !== "");

  if (ingredientList.length < 2) {
    setError("Please enter at least two ingredients.");
    return;
  }

  setError("");

  const newRecipe = ({
    id: Date.now(),
    title: title,
    ingredients: ingredientList,
    instructions: steps,
    image: "/images/default.jpg",
    summary: summary
  });

    addRecipe(newRecipe);

    setSteps("");
    setTitle("");
    setIngredients("");
    setSummary("");
};


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Add New Recipe</h2>

      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded"
      />
      <textarea
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full border p-3 rounded h-32"
      />

      <textarea
        placeholder="Preparation Steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        className="w-full border p-3 rounded h-32"
      />

      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border p-3 rounded h-32"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
