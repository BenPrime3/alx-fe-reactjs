// import { create } from 'zustand';

// const useRecipeStore = create((set, get) => ({
//   recipes: [],
//   searchTerm: '',
//   setRecipes: (recipes) => set({ recipes }),


//   addRecipe: (newRecipe) =>
//     set((state) => ({
//       recipes: [...state.recipes, newRecipe],
//     })),

//   deleteRecipe: (id) =>
//     set((state) => ({
//       recipes: state.recipes.filter((recipe) => recipe.id !== id),
//     })),

//   updateRecipe: (updatedRecipe) =>
//     set((state) => ({
//       recipes: state.recipes.map((recipe) =>
//         recipe.id === updatedRecipe.id ? updatedRecipe : recipe
//       ),
//     })),

//   setSearchTerm: (term) => set({ searchTerm: term }),

//   getFilteredRecipes: () => {
//     const { recipes, searchTerm } = get();
//     return recipes.filter((recipe) =>
//       recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   },
// }));


// export { useRecipeStore };


import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  favorites: [],
  recommendations: [],

  // ---------- RECIPES ----------
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  setRecipes: (recipes) => set({ recipes }), 

  // ---------- SEARCH ----------
  setSearchTerm: (term) => set({ searchTerm: term }),

  // ---------- FAVORITES ----------
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // ---------- RECOMMENDATIONS ----------
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) =>
          state.favorites.includes(recipe.id) && Math.random() > 0.5
      );

      return { recommendations: recommended };
    }),
}));

export { useRecipeStore };
