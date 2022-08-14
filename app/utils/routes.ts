export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  MOVIES: "/movies",
  MOVIE_EDIT: (id: number) => `/movies/edit/${id}`,
  MOVIE_DETAILS: (id: number) => `/movies/${id}`,
  PROFILE: "/profile",
} as const;
