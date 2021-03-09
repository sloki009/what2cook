import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import api from "./api";
import "./recipes.css";
import Modal from "./Modal";
import RecipeDescription from "./RecipeDescription";

function SearchRecipeByIngredients({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const containerRef = useRef(null);
  const [modal, setModal] = useState({ modalShow: false, modalInfo: "" });
  const [numberOfRecipes, setNumberOfRecipes] = useState({
    number: 10,
    maxNumber: 25,
    tobeIncr: 5,
    default: 10,
    btnText: "show more",
  });
  const fetchUrl = `${api.searchRecipeByIngredients}&ingredients=${ingredients}&number=${numberOfRecipes.number}`;
  const handleShowMore = () => {
    let number = numberOfRecipes.number;
    let maxNumber = numberOfRecipes.maxNumber;
    let btnText = numberOfRecipes.btnText;
    let tobeIncr = numberOfRecipes.tobeIncr;
    let defaultNumber = numberOfRecipes.default;

    if (number < maxNumber) {
      number + tobeIncr < maxNumber
        ? setNumberOfRecipes({ ...numberOfRecipes, number: number + tobeIncr })
        : setNumberOfRecipes({
            ...numberOfRecipes,
            btnText: "show less",
            number: number + tobeIncr,
          });
    } else {
      setNumberOfRecipes({
        ...numberOfRecipes,
        number: defaultNumber,
        btnText: "show more",
      });
    }
  };

  const handleModal = (info = "") => {
    setModal({
      modalShow: !modal.modalShow,
      modalInfo: !modal.modalShow ? (
        <RecipeDescription description={info} />
      ) : (
        ""
      ),
    });
  };

  useEffect(() => {
    const request = (executeScroll) => {
      axios
        .get(fetchUrl)
        .then((request) => {
          console.log(request.data);
          setRecipes(request.data);
        })
        .then(() => executeScroll())
        .catch((err) => console.log(err));
    };
    request(executeScroll);
    //executeScroll();
  }, [fetchUrl]);

  const executeScroll = () => {
    //console.log("in scrollfunc");
    containerRef.current.scrollIntoView();
  };

  return (
    <div ref={containerRef} className="container">
      <div className="searchRecipeContainer">
        <div className="recipeCardsContainer">
          {recipes.map((recipe, index) => {
            return (
              <div key={index} className="recipecard">
                <a
                  role="button"
                  href=""
                  className="recipe_link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleModal(recipe);
                  }}
                >
                  <div className="recipecard_contents">
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                  <div className="recipe_contents_card">
                    <p className="recipe_title_card">{recipe.title}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        <div className="showmore">
          <button className="showmore_btn" onClick={() => handleShowMore()}>
            {(console.log(numberOfRecipes), numberOfRecipes.btnText)}
          </button>
        </div>
      </div>
      <Modal
        displayModal={modal.modalShow}
        modalInfo={modal.modalInfo}
        closeModal={handleModal}
      />
    </div>
  );
}

export default SearchRecipeByIngredients;
