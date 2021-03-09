import React from "react";
import "./recipe_description.css";
import api, { recipeImageSize } from "./api";
import RecipeInstructions from "./RecipeInstructions";
import RecipeIngredients from "./RecipeIngredients";
import RecipeMeta from "./RecipeMeta";
import styled from "styled-components";

const CustomHrTag = styled.hr`
  margin: 5px 0 5px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;
function RecipeDescription({ description }) {
  console.log(description);
  const setBackgroundImage = (image) => {
    return { backgroundImage: `url(${image})` };
  };
  return (
    <div className="description_container">
      <div className="description">
        <div
          className="poster"
          style={{
            backgroundImage: `url(${api.recipeImages}${description.id}-${recipeImageSize}.${description.imageType})`,
          }}
        ></div>
        <div className="recipe_contents_container">
          <div className="recipe_contents">
            <div className="recipe_contents_sub">
              <div className="recipe_meta_minor">
                <RecipeMeta id={description.id} type="minor" />
              </div>
              <div className="recipe_title">
                <p>{description.title}</p>
              </div>
              <div className="recipe_main_contents">
                <div className="recipe_contents_sub_left">
                  <div className="instructions">
                    <h2>Instructions</h2>
                    <CustomHrTag />
                    <RecipeInstructions id={description.id} />
                  </div>
                  <div className="ingredients">
                    <h2>Ingredients</h2>
                    <CustomHrTag />
                    <RecipeIngredients id={description.id} />
                  </div>
                </div>
                <div className="seperator" style={{ height: "100%" }}></div>
                <div className="recipe_contents_sub_right">
                  <div className="cuisines">
                    <h5>Cuisines</h5>
                    <CustomHrTag />
                    <RecipeMeta id={description.id} type="cuisines" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDescription;
