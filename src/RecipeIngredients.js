import React, { useState, useEffect } from "react";
import api, { setAPIParams } from "./api";
import axios from "./axios";

function RecipeIngredients(props) {
  const [recipeIngredients, setRecipeIngredients] = useState({});
  let fetchUrl = setAPIParams(api.RecipeIngredientsById, { id: props.id });
  useEffect(() => {
    const request = () => {
      axios
        .get(fetchUrl)
        .then((request) => {
          setRecipeIngredients(request.data);
        })
        .catch((err) => console.log(err));
    };
    if (props.id) {
      request();
    }
  }, [fetchUrl]);
  return (
    <div className="ingredients_list_container">
      <div className="recipe_ingredients">
        <ul className="ingredients_list">
          {recipeIngredients.ingredients?.map((ingredient, index) => {
            return (
              <a
                className="ingredient_btn"
                onClick={(e) => {
                  e.preventDefault();
                }}
                key={index}
              >
                <li>{ingredient.name}</li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default RecipeIngredients;
