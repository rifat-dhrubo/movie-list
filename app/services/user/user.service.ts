import axios from "axios";

import { API_URL } from "environment";
import { MeResponse, UpdateUserResponse } from "types/user.type";

export const getLoggedInUser = (token: string) => {
  return {
    api() {
      return axios
        .get<MeResponse>(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ["getLoggedInUser"];
    },
  };
};

export const updateUser = (token: string) => {
  return {
    api(data: UpdateUserResponse) {
      return axios
        .patch<UpdateUserResponse>(`${API_URL}/user`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};
