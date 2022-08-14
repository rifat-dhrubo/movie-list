/**
 * This is just an example please use your own route definitions
 */
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  MOVIES: "/movies",
  MOVIE_DETAILS: (id: number) => `/movies/${id}`,
  PROFILE: "/profile",
};
