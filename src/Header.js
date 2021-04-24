import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./header.css";
import SearchRecipeByIngredients from "./SearchRecipeByIngredients";
import api from "./api";
import AutocompleteMulti from "./AutocompleteMulti";

function Header() {
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [ingredients, setIngredients] = useState("");

  const handleSearchClick = (value) => {
    console.log("in handlesearchclick", value);
    setSearchClicked(value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submit", event);
    ReactDOM.render(
      <SearchRecipeByIngredients
        // fetchUrl={`${api.searchRecipeByIngredients}&ingredients=${ingredients}&number=10`}
        ingredients={ingredients}
      />,
      document.getElementById("searchrecipeByIngredients_cont")
    );
    // handleSearchClick(true);
  };
  const handleSearchChange = (searchedItems) => {
    console.log("in handleSearchChange", searchedItems);
    let query = searchedItems?.map((curValue) => {
      return curValue.value;
    });
    console.log(query.join(","));
    setIngredients(query.join(","));
  };
  return (
    <div className="header_container">
      <header className="header">
        <div className="header_contents">
          <h1 className="tag_text">What's in your fridge ?</h1>
          <h2 className="header_tagline">
            Discover the best recipe with what you have
          </h2>
          <div className="searchContainer">
            <form onSubmit={handleFormSubmit}>
              <div className="searchbox">
                <div className="searchbox_container">
                  <div className="searchicon">
                    <i color="#828282" size="18">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#828282"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        aria-labelledby="icon-svg-title- icon-svg-desc-"
                        role="img"
                      >
                        <title>Search</title>
                        <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
                      </svg>
                    </i>
                  </div>
                  {/* <input
                  value={ingredients}
                  placeholder="Enter your ingredients eg: rice, meat etc"
                  className="ingredients_search_input"
                  onChange={(e) => handleSearchChange(e)}
                ></input> */}
                  <AutocompleteMulti handleSearchChange={handleSearchChange} />
                </div>
                <div className="seperator"></div>
                <div className="ingredient_search_btn_container">
                  <button
                    type="submit"
                    className="ingredient_search_btn"
                    // onClick={() => handleSearchClick(true)}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="ingredient_search_btn_container_res">
                <button
                  type="submit"
                  className="ingredient_search_btn"
                  // onClick={() => handleSearchClick(true)}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
      <div style={{ position: "relative", marginBottom: "4rem" }}></div>
      {
        //console.log("in render")
      }
      <div id="searchrecipeByIngredients_cont"></div>
      {/* {isSearchClicked && ingredients ? (
        <SearchRecipeByIngredients
          fetchUrl={`${api.searchRecipeByIngredients}&ingredients=${ingredients}&number=10`}
          ingredients={ingredients}
        />
      ) : (
        ""
      )} */}
    </div>
  );
}

export default Header;
