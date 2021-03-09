const API_KEY = "8294772821684990afae8df10b6e899d";
export const baseURL = "https://api.spoonacular.com";

export const recipeImageSize = "636x393";
const api = {
  searchRecipeByIngredients: `/recipes/findByIngredients?apiKey=${API_KEY}`,
  recipeImages: `https://spoonacular.com/recipeImages/`,
  analyzedInstructions: `/recipes/{id}/analyzedInstructions?apiKey=${API_KEY}`,
  RecipeIngredientsById: `/recipes/{id}/ingredientWidget.json?apiKey=${API_KEY}`,
  recipeInformation: `/recipes/{id}/information?apiKey=${API_KEY}`,
};

export const setAPIParams = (urlName, { ...params }) => {
  let url = urlName;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`{${key}}`, value);
  }
  return url;
};

export const ingredientsCSVPath = "./csv/top-1k-ingredients.csv";
export default api;
