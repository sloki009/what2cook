import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome";

function RecipeItemsBox({ boxData }) {
  //console.log("in boxcrete...", boxData);
  return (
    <ul className="info_list">
      {boxData?.map((item, index) => {
        //console.log(item);
        return (
          <a
            title={item.title}
            className="icon_name_btn"
            onClick={(e) => {
              e.preventDefault();
            }}
            key={index}
          >
            {item.isLeftIcon ? (
              <FontAwesomeIcon
                icon={item.left}
                style={{ color: item?.color }}
              />
            ) : (
              <div>{item.left}</div>
            )}
            {item.left != "" ? (
              <div className="seperator" style={{ height: "21px" }}></div>
            ) : (
              ""
            )}
            <div>{item.right}</div>
          </a>
        );
      })}
    </ul>
  );
}

export default RecipeItemsBox;
