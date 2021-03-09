import axios from "axios";
import api, { baseURL } from "./api";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
