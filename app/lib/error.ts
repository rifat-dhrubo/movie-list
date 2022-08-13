import axios, { AxiosError } from "axios";

export const isAxiosError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error);
};
