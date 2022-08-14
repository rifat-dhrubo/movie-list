import { operations } from "generated/server.type";
export type MeResponse =
  operations["UserController_me"]["responses"][200]["content"]["application/json"];
export type UpdateUserResponse =
  operations["UserController_updateUser"]["responses"][200]["content"]["application/json"];
