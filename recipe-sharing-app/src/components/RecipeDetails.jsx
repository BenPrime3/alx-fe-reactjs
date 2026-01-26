import { useRecipeStore } from './recipeStore';

  const RecipeDetails = ({ recipeId }) => {
    const recipe = useRecipeStore(state =>
      state.recipes.find(recipe => recipe.id === recipeId)
    );

    return (
      <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    );
  };