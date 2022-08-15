import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@smastrom/react-rating";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import Button from "components/Button.tsx/Button";
import FormInput from "components/FormInput/FormInput";
import AppLayout from "components/Layouts/AppLayout";
import { createMovie, updateMovie } from "services/movie";
import { User } from "types/auth.type";
import { CreateMovieInput, UpdateMovieInput } from "types/movie.type";
import { ROUTES } from "utils/routes";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().min(3, "Description must be at least 3 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can be maxed 5"),
  imageLink: z.string().url("Image link must be a valid URL"),
});

type FormType = z.infer<typeof schema>;

type Props = {
  accessToken: string;
  user: User;
  type: "create" | "edit";
  movie?: Omit<UpdateMovieInput, "userId">;
};

const StarDrawing = (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#facc15",
  inactiveFillColor: "#d1d5db",
};

const MovieForm = ({ accessToken, user, type, movie }: Props) => {
  const { register, handleSubmit, formState, control, reset } =
    useForm<FormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        rating: 0,
      },
    });
  const { api } = createMovie(accessToken);
  const { mutateAsync: createMutateAsync, status: createStatus } = useMutation(
    api,
    {
      onSuccess: () => {
        reset({
          rating: 0,
        });
      },
    }
  );

  const router = useRouter();
  const { movieId } = router.query;

  const { api: updateApi } = updateMovie(accessToken, Number(movieId));
  const { mutateAsync: updateMutateAsync, status: updateStatus } = useMutation(
    updateApi,
    {
      onSuccess: () => {
        router.push(ROUTES.MOVIES);
      },
    }
  );

  const onSubmit = (formData: FormType) => {
    if (type === "create") {
      const data: CreateMovieInput = {
        ...formData,
        userId: user.id,
      };
      toast.promise(createMutateAsync(data), {
        loading: "Creating movie",
        success: "Movie created",
        error: "Failed to create movie",
      });

      return;
    } else {
      const data: UpdateMovieInput = {
        ...formData,
        userId: user.id,
      };
      toast.promise(updateMutateAsync(data), {
        loading: "Updating movie",
        success: "Movie updated",
        error: "Failed to update movie",
      });

      return;
    }
  };

  React.useEffect(() => {
    if (type === "edit" && movie != null) {
      reset({
        ...movie,
      });
    }
  }, [movie, reset, type]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold text-slate-800">Create Movie</h1>

        <main>
          <form
            className="grid items-center grid-cols-1 gap-8 px-4 py-12 mt-4 shadow bg-slate-50 sm:grid-cols-2"
            onSubmit={handleSubmit(onSubmit)}
            id="create-form"
          >
            <FormInput
              name="title"
              labelText="Title"
              error={formState.errors.title ? true : false}
              errorMessage={formState.errors.title?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.title ? "input__error" : "input__base"
                )}
                type="text"
                id="title"
                autoComplete="title"
                {...register("title")}
                aria-describedby="title-error"
              />
            </FormInput>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value }, formState }) => (
                <FormInput
                  name="rating"
                  labelText="Rating"
                  error={formState.errors.rating ? true : false}
                  errorMessage={formState.errors.rating?.message}
                >
                  <Rating
                    style={{
                      maxWidth: "112px",
                    }}
                    value={value}
                    onChange={onChange}
                    itemStyles={customStyles}
                    transition="zoom"
                  />
                </FormInput>
              )}
            />
            <FormInput
              name="imageLink"
              labelText="Image Link"
              error={formState.errors.imageLink ? true : false}
              errorMessage={formState.errors.imageLink?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.imageLink ? "input__error" : "input__base"
                )}
                type="url"
                id="imageLink"
                autoComplete="imageLink"
                {...register("imageLink")}
                aria-describedby="imageLink-error"
              />
            </FormInput>
            <FormInput
              name="description"
              labelText="Description"
              error={formState.errors.description ? true : false}
              errorMessage={formState.errors.description?.message}
            >
              <textarea
                className={classNames(
                  "input",
                  formState.errors.title ? "input__error" : "input__base"
                )}
                id="description"
                autoComplete="description"
                {...register("description")}
                aria-describedby="description-error"
                rows={5}
              />
            </FormInput>
          </form>
          <div className="flex justify-end">
            <Button
              type="submit"
              form="create-form"
              className="justify-center w-full max-w-xs mt-8 ml-auto"
              disabled={
                createStatus === "loading" ||
                updateStatus === "loading" ||
                formState.isSubmitting
              }
            >
              {createStatus === "loading" || updateStatus === "loading" ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-slate-800 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

MovieForm.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Create" type="signedIn">
      {page}
    </AppLayout>
  );
};

export default MovieForm;
