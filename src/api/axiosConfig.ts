import axios from "axios";

const httpClient = axios.create({
  baseURL: "src/data",
});

export default httpClient;
