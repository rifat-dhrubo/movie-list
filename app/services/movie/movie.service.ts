import axios from "axios";

import { API_URL } from "environment";
import {
  DeleteMovieResponse,
  GetAllMovieResponse,
  MovieSearchInput,
  MovieSearchResponse,
} from "types/movie.type";
import {
  CreateMovieInput,
  CreateMovieResponse,
  UpdateMovieInput,
  UpdateMovieResponse,
} from "types/movie.type";

export const createMovie = (token: string) => {
  return {
    api(data: CreateMovieInput) {
      return axios
        .post<CreateMovieResponse>(`${API_URL}/movie`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};

export const updateMovie = (token: string) => {
  return {
    api(data: UpdateMovieInput) {
      return axios
        .patch<UpdateMovieResponse>(`${API_URL}/movie`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};

export const getAllMovies = (token: string) => {
  return {
    api() {
      return axios
        .get<GetAllMovieResponse>(`${API_URL}/movie`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },

    getKey() {
      return ["getAllMovies"];
    },
  };
};

export const movieSearch = (token: string, query: MovieSearchInput) => {
  const params = new URLSearchParams();
  if (query.sortBy) {
    params.append("sortBy", query.sortBy);
  }
  if (query.sortOrder) {
    params.append("sortOrder", query.sortOrder);
  }
  if (query.page) {
    params.append("page", query.page.toString());
  }
  if (query.size) {
    params.append("size", query.size.toString());
  }
  if (query.search) {
    params.append("search", query.search);
  }

  return {
    api() {
      return axios
        .get<MovieSearchResponse>(`${API_URL}/movie?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },

    getKey() {
      return ["movieSearch", params.toString()];
    },
  };
};

export const getMovie = (token: string, id: string) => {
  return {
    api() {
      return axios
        .get<GetAllMovieResponse>(`${API_URL}/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ["getMovie", id];
    },
  };
};

export const deleteMovie = (token: string) => {
  return {
    api(id: string) {
      return axios
        .delete<DeleteMovieResponse>(`${API_URL}/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
  };
};
