import React, { useState, useEffect } from "react";
import api, { setAPIParams } from "./api";
import axios from "./axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";
import RecipeItemsBox from "./RecipeItemsBox";

const minorInfo = [
  {
    key: "servings",
    left: ["fas", "utensils"],
    right: 0,
    title: "servings",
    isLeftIcon: true,
    color: "#f7632d",
  },
  {
    key: "readyInMinutes",
    left: ["far", "clock"],
    right: 0,
    title: "readyInMinutes",
    isLeftIcon: true,
    color: "#b6c108e3",
  },
  {
    key: "aggregateLikes",
    left: ["far", "thumbs-up"],
    right: 0,
    title: "aggregateLikes",
    isLeftIcon: true,
    color: "#08cd17e3",
  },
];

function RecipeMeta(props) {
  console.log("in recipemeta", props);
  const [recipeInformation, setrecipeInformation] = useState({});
  const [boxData, setboxData] = useState([]);
  let fetchUrl = setAPIParams(api.recipeInformation, { id: props.id });
  useEffect(() => {
    const request = () => {
      axios
        .get(fetchUrl)
        .then((request) => {
          let func;
          switch (props.type) {
            case "minor":
              func = handleMinorData(request.data);
              break;
            case "cuisines":
              func = handleCuisineData(request.data);
              break;
            default:
              break;
          }
          setboxData(func);
        })
        .catch((err) => console.log(err));
    };
    if (props.id) {
      request();
    }
    const handleMinorData = (recipeInformation) => {
      minorInfo.forEach(async (info, index) => {
        info["right"] = await recipeInformation[info.key];
      });
      return minorInfo;
    };
    const handleCuisineData = (recipeInformation) => {
      let tempArr = [];
      recipeInformation.cuisines.forEach(async (item, index) => {
        tempArr.push({
          left: "",
          right: item,
          isLeftIcon: false,
          title: item,
          hasOnlyOne: true,
        });
      });
      return tempArr;
    };
  }, [fetchUrl]);

  return (
    <div className="information_list_container">
      <div className="recipe_information">
        <RecipeItemsBox boxData={boxData} />
      </div>
    </div>
  );
}

export default RecipeMeta;
