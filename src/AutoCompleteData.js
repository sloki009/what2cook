import axios from "axios";
import Papa from "papaparse";
import { ingredientsCSVPath } from "./api";

function AutoCompleteData() {
  let autoCompleteCSVData = [];
  console.log("in autocompltdata...");
  const fetchCsv = () => {
    return fetch(ingredientsCSVPath).then(function (response) {
      //console.log("fetchresp..", response);
      let reader = response.body.getReader();
      let decoder = new TextDecoder("utf-8");

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  };

  const getCsvData = async () => {
    let csvData = await fetchCsv();
    return new Promise((resolve) => {
      Papa.parse(csvData, {
        //header: true,
        complete: (results) => {
          console.log("Complete papaparse", results);
          resolve(results.data);
        },
      });
    });
  };

  return new Promise((resolve, reject) => {
    try {
      var data = getCsvData();
      data.then((result) => {
        resolve(result);
        console.log(result);
      });
    } catch (e) {
      reject([]);
    }
  });
}

export default AutoCompleteData;
