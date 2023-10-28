import { Axios } from "axios";

const axios = new Axios({
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  transformRequest: [
    function transformRequest(data) {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    function transformResponse(data) {
      return JSON.parse(data);
    },
  ],
});

export default axios;
