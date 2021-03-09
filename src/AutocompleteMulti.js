import React, { useState, useEffect } from "react";
import WindowedSelect from "react-windowed-select";
import { components, createFilter } from "react-windowed-select";
import { Scrollbars } from "react-custom-scrollbars";
//import Select, { components } from "react-select";
import AutoCompleteData from "./AutoCompleteData";
import { ingredientsCSVPath } from "./api";
import { WindowedMenuList } from "react-windowed-select";
import CreatableSelect from "react-select/creatable";

function AutocompleteMulti(props) {
  const [autoCompleteData, setautoCompleteData] = useState([]);
  const [multiSelectValue, setmultiSelectValue] = useState("");
  const handleSelectChange = (e) => {
    console.log(e);
    props.handleSearchChange(e);
    //setmultiSelectValue(e.value);
  };
  useEffect(() => {
    const autoCompleteData = async () => {
      const result = await AutoCompleteData().then((response) => {
        let responseData = response?.map(([item1, item2]) => {
          return { value: item1, label: item1 };
        });
        setautoCompleteData(responseData);
      });
    };
    autoCompleteData();
  }, [ingredientsCSVPath]);
  const { Option } = components;

  const renderScrollbar = (props) => {
    return (
      <div style={{ height: 200 }}>
        <Scrollbars>{props.children}</Scrollbars>
      </div>
    );
  };
  const customFilter = createFilter({ ignoreAccents: false });
  const customComponents = {
    ClearIndicator: (props) => (
      <components.ClearIndicator {...props}>clear</components.ClearIndicator>
    ),
  };
  const renderOption = (props) => {
    return (
      <Option {...props}>
        <div>{props.data.label}</div>
      </Option>
    );
  };
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.8em",
    }),
    option: (base) => ({
      ...base,
      color: `black`,
      fontSize: `15px`,
      borderBottom: `0.5px solid grey`,
      //background: "linear-gradient(#e66465, #9198e5);",
      //height: "100%",
    }),
  };
  return (
    // <Select
    //   onChange={handleSelectChange}
    //   value={multiSelectValue}
    //   isMulti
    //   name="search-input"
    //   components={{
    //     DropdownIndicator: () => null,
    //     IndicatorSeparator: () => null,
    //     Option: renderOption,
    //     MenuList: renderScrollbar,
    //   }}
    //   placeholder={"Enter your ingredients eg: rice, meat etc"}
    //   options={autoCompleteData}
    //   className="ingredients_search_input"
    //   classNamePrefix="select_input"
    //   height="100%"
    //   styles={style}
    //   filterOption={createFilter({ ignoreAccents: false })}
    // />
    <CreatableSelect
      onChange={handleSelectChange}
      //value={multiSelectValue}
      isMulti
      components={{
        MenuList: WindowedMenuList,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      //   components={customComponents}
      filterOption={customFilter}
      options={autoCompleteData}
      className="ingredients_search_input"
      classNamePrefix="select_input"
      placeholder={"Enter your ingredients eg: rice, meat etc"}
      height="100%"
      styles={style}
      isClearable={true}
    />
  );
}

export default AutocompleteMulti;
