/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/auth/sign-in": {
    post: operations["AuthController_signIn"];
  };
  "/auth/sign-up": {
    post: operations["AuthController_signUp"];
  };
  "/auth/change-password": {
    patch: operations["AuthController_changePassword"];
  };
  "/user/me": {
    get: operations["UserController_me"];
  };
  "/user": {
    patch: operations["UserController_updateUser"];
  };
  "/movie": {
    get: operations["MovieController_findAll"];
    post: operations["MovieController_create"];
  };
  "/movie/search": {
    get: operations["MovieController_search"];
  };
  "/movie/{id}": {
    get: operations["MovieController_findOne"];
    delete: operations["MovieController_remove"];
    patch: operations["MovieController_update"];
  };
}

export interface components {
  schemas: {
    SignInInput: {
      email: string;
      password: string;
    };
    UserDto: {
      id: number;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      name: string;
      email: string;
      hash: string;
    };
    SignInResponse: {
      user: components["schemas"]["UserDto"];
      accessToken: string;
      status: number;
      message: string;
    };
    ErrorResponseDto: {
      message: string | string[];
      statusCode: number;
      error: string;
    };
    SignUpInputDto: {
      name: string;
      email: string;
      password: string;
    };
    BaseResponseDto: {
      status: number;
      message: string;
    };
    ChangeUserPasswordInput: {
      userId: number;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    };
    UpdateUserResponse: {
      status: number;
      message: string;
      content: components["schemas"]["UserDto"];
    };
    UpdateUserInput: {
      id?: number;
      name?: string;
      email?: string;
    };
    CreateMovieDto: {
      userId: number;
      title: string;
      rating: number;
      description: string;
      imdbLink?: string;
      imageLink?: string;
      watchLink?: string;
    };
    MoviePaginationMeta: {
      total: number;
      lastPage: number;
      currentPage: number;
      size: number;
      prev: number | null;
      next: number | null;
    };
    MovieDto: {
      id: number;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      userId: number;
      user: components["schemas"]["UserDto"];
      title: string;
      rating: number;
      description: string;
      imdbLink?: string;
      imageLink?: string;
      watchLink?: string;
    };
    GetMovieByIdResponse: {
      id: number;
      /** Format: date-time */
      createdAt: string;
      /** Format: date-time */
      updatedAt: string;
      userId: number;
      title: string;
      rating: number;
      description: string;
      imdbLink?: string;
      imageLink?: string;
      watchLink?: string;
    };
    UpdateMovieDto: {
      userId?: number;
      title?: string;
      rating?: number;
      description?: string;
      imdbLink?: string;
      imageLink?: string;
      watchLink?: string;
    };
  };
}

export interface operations {
  AuthController_signIn: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SignInResponse"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponseDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignInInput"];
      };
    };
  };
  AuthController_signUp: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"];
        };
      };
      400: {
        content: {
          "application/json": components["schemas"]["ErrorResponseDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignUpInputDto"];
      };
    };
  };
  AuthController_changePassword: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UpdateUserResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ChangeUserPasswordInput"];
      };
    };
  };
  UserController_me: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["UserDto"];
          };
        };
      };
    };
  };
  UserController_updateUser: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UpdateUserResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserInput"];
      };
    };
  };
  MovieController_findAll: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["MovieDto"][];
          };
        };
      };
    };
  };
  MovieController_create: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["CreateMovieDto"];
          };
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateMovieDto"];
      };
    };
  };
  MovieController_search: {
    parameters: {
      query: {
        sortBy?: "createdAt" | "updatedAt" | "title" | "rating";
        sortOrder?: "asc" | "desc";
        search?: string;
        page?: number;
        size?: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["MovieDto"][];
            meta?: components["schemas"]["MoviePaginationMeta"];
          };
        };
      };
    };
  };
  MovieController_findOne: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["GetMovieByIdResponse"];
          };
        };
      };
    };
  };
  MovieController_remove: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"];
        };
      };
    };
  };
  MovieController_update: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["BaseResponseDto"] & {
            content?: components["schemas"]["GetMovieByIdResponse"];
          };
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateMovieDto"];
      };
    };
  };
}

export interface external {}