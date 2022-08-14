import axios from "axios";

import { API_URL } from "environment";
import {
  ChangePasswordResponse,
  ChangeUserPasswordInput,
  SignInInput,
  SignInResponse,
  SignUpInput,
  SignUpResponse,
} from "types/auth.type";

export const getSessionInfo = () => {
  return {
    api() {
      return axios.get("/api/user").then(({ data }) => data);
    },
    getKey() {
      return ["getSessionInfo"];
    },
  };
};

export const signInApi = () => {
  return {
    api(data: SignInInput) {
      return axios
        .post<SignInResponse>(`${API_URL}/auth/sign-in`, data)
        .then(({ data }) => data);
    },
  };
};

export const signUpApi = () => {
  return {
    api(data: SignUpInput) {
      return axios
        .post<SignUpResponse>(`${API_URL}/auth/sign-up`, data)
        .then(({ data }) => data);
    },
  };
};

export const changePasswordApi = () => {
  return {
    api(data: ChangeUserPasswordInput) {
      return axios
        .post<ChangePasswordResponse>(`${API_URL}/auth/change-password`, data)
        .then(({ data }) => data);
    },
  };
};

export const sessionLogin = (input: SignInResponse) =>
  axios.post<SignInResponse>("/api/login", input).then((res) => res.data);

export const sessionLogout = () =>
  axios.post<{}>("/api/logout").then((res) => res.data);
