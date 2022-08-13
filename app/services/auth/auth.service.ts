import axios from "axios";

import { API_URL } from "environment";

export const getSessionUser = () => {
  return {
    api() {
      return axios.get("/api/user").then(({ data }) => data);
    },
    getKey() {
      return ["getSessionUser"];
    },
  };
};
