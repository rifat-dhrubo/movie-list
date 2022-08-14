import { components, operations } from "generated/server.type";

export type User = components["schemas"]["UserDto"];

export type SignInInput =
  operations["AuthController_signIn"]["requestBody"]["content"]["application/json"];
export type SignUpInput =
  operations["AuthController_signUp"]["requestBody"]["content"]["application/json"];
export type ChangeUserPasswordInput =
  operations["AuthController_changePassword"]["requestBody"]["content"]["application/json"];

export type SignInResponse =
  operations["AuthController_signIn"]["responses"]["200"]["content"]["application/json"];
export type SignUpResponse =
  operations["AuthController_signUp"]["responses"]["201"]["content"]["application/json"];
export type ChangePasswordResponse =
  operations["AuthController_changePassword"]["responses"]["200"]["content"]["application/json"];
export type ErrorResponseDto = components["schemas"]["ErrorResponseDto"];
