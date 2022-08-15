import axios from "axios";

import { API_URL } from "environment";
import {
  MeResponse,
  UpdateUserInput,
  UpdateUserResponse,
} from "types/user.type";

export const getLoggedInUser = (token: string) => {
  return {
    api() {
      return axios
        .get<MeResponse>(`/api/user`, {
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

export const updateSessionUser = () => {
  return {
    api(data: UpdateUserResponse["content"]) {
      return axios.patch(`/api/user`, { user: data }).then(({ data }) => data);
    },
  };
};

export const updateUser = (token: string) => {
  return {
    api(data: UpdateUserInput) {
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
