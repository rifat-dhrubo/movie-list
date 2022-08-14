import { components, operations } from "generated/server.type";

export type CreateMovieInput =
  operations["MovieController_create"]["responses"]["201"]["content"]["application/json"];
export type UpdateMovieInput =
  operations["MovieController_update"]["requestBody"]["content"]["application/json"];
export type MovieSearchInput =
  operations["MovieController_search"]["parameters"]["query"];

export type CreateMovieResponse =
  operations["MovieController_create"]["responses"]["201"]["content"]["application/json"];
export type UpdateMovieResponse =
  operations["MovieController_update"]["responses"]["200"]["content"]["application/json"];
export type GetAllMovieResponse =
  operations["MovieController_findAll"]["responses"]["200"];
export type MovieSearchResponse =
  operations["MovieController_search"]["responses"]["200"]["content"]["application/json"];
export type GetMovieByIdResponse =
  operations["MovieController_findOne"]["responses"]["200"]["content"]["application/json"];

export type DeleteMovieResponse =
  operations["MovieController_remove"]["responses"]["200"]["content"]["application/json"];

export type Movie = components["schemas"]["MovieDto"];
