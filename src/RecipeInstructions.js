import React, { useState, useEffect } from "react";
import api, { setAPIParams } from "./api";
import axios from "./axios";

function RecipeInstructions(props) {
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  let fetchUrl = setAPIParams(api.analyzedInstructions, { id: props.id });
  useEffect(() => {
    const request = () => {
      //console.log("fetchurl...", fetchUrl);
      axios
        .get(fetchUrl)
        .then((request) => {
          setRecipeInstructions(request.data);
          //console.log(request);
        })
        .catch((err) => console.log(err));
    };
    if (props.id) {
      request();
    }
  }, [fetchUrl]);

  return (
    <div className="recipe_instructions_container">
      <div className="recipe_instructions">
        {recipeInstructions.map((instruction, index) => {
          return (
            <ol key={index}>
              {instruction.steps.map((step, sub_index) => {
                //console.log("step....", step.step);
                return <li key={sub_index}>{step.step}</li>;
              })}
            </ol>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeInstructions;
