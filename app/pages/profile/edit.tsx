import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import Button from "components/Button.tsx/Button";
import FormInput from "components/FormInput/FormInput";
import AppLayout from "components/Layouts/AppLayout";
import MovieForm from "components/MovieForm/MovieForm";
import { withSessionSsr } from "lib/auth/session";
import { updateSessionUser, updateUser } from "services/user";
import { UpdateUserInput, UpdateUserResponse } from "types/user.type";
import { ROUTES } from "utils/routes";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255),
  email: z.string().email("Email must be valid"),
});

type FormType = z.infer<typeof schema>;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const EditProfile = ({ accessToken, user }: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { api: sessionApi } = updateSessionUser();
  const { mutateAsync, status: sessionUpdateStatus } = useMutation(sessionApi, {
    onSuccess() {
      router.push(ROUTES.PROFILE);
    },
  });
  const { api } = updateUser(accessToken);
  const { mutateAsync: updateMutateAsync, status: updateStatus } = useMutation(
    api,
    {
      onSuccess(data) {
        toast.promise(mutateAsync(data.content), {
          loading: "Updating session info",
          success: "Session info updated",
          error: "Error updating session info",
        });
      },
    }
  );

  React.useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
    });
  }, [reset, user.name, user.email]);

  const onSubmit = (formData: FormType) => {
    const data: UpdateUserInput = {
      ...formData,
    };
    toast.promise(updateMutateAsync(data), {
      loading: "Updating profile",
      success: "Profile Updated",
      error: "Failed to update profile",
    });

    return;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
        <main>
          <form
            className="grid items-center grid-cols-1 gap-8 px-4 py-12 mt-4 rounded shadow bg-slate-50"
            onSubmit={handleSubmit(onSubmit)}
            id="user-update-form"
          >
            <FormInput
              name="name"
              labelText="Name"
              error={formState.errors.name ? true : false}
              errorMessage={formState.errors.name?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.name ? "input__error" : "input__base"
                )}
                type="text"
                id="name"
                autoComplete="name"
                {...register("name")}
                aria-describedby="name-error"
              />
            </FormInput>

            <FormInput
              name="email"
              labelText="Email"
              error={formState.errors.email ? true : false}
              errorMessage={formState.errors.email?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.email ? "input__error" : "input__base"
                )}
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
                aria-describedby="email-error"
              />
            </FormInput>
          </form>
          <div className="flex justify-end">
            <Button
              type="submit"
              form="user-update-form"
              className="justify-center w-full mt-8 ml-auto"
              disabled={
                sessionUpdateStatus === "loading" ||
                updateStatus === "loading" ||
                formState.isSubmitting
              }
            >
              {sessionUpdateStatus === "loading" ||
              updateStatus === "loading" ? (
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

EditProfile.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Edit Profile" type="signedIn">
      {page}
    </AppLayout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const { user, accessToken } = req.session;

    if (user == null || accessToken == null) {
      return {
        redirect: {
          destination: `${ROUTES.SIGN_IN}?redirect=${ROUTES.MOVIES}`,
          permanent: false,
        },
        props: {
          accessToken,
          user,
        },
      };
    }

    return {
      props: {
        accessToken,
        user,
      },
    };
  }
);

export default EditProfile;
