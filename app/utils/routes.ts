/**
 * This is just an example please use your own route definitions
 */
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  APP: {
    HOME: "/app/dashboard",
    DOCUMENTS: "/app/document",
    NETWORK: {
      HOME: "/app/network",
      list: "/app/network/list",
      company: {
        HOME: (companyId: string) => `/app/network/company/${companyId}`,
      },
    },
  },
};
