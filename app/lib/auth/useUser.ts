import Router from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { getSessionUser } from "services/auth";
import { ROUTES } from "utils/routes";

/**
 *
 * Will redirect to login page if user is not logged in.
 *
 * Can be set to redirect if the use is found, by setting `redirectIfFound` to true
 */
export default function useUser({
  redirectTo = ROUTES.SIGN_IN,
  redirectIfFound = false,
} = {}) {
  const { api, getKey } = getSessionUser();
  const { data: user } = useQuery(getKey(), api);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user };
}
