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
import { withSessionSsr } from "lib/auth/session";
import { changePasswordApi } from "services/auth";
import { ChangeUserPasswordInput } from "types/auth.type";
import { ROUTES } from "utils/routes";

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword", "newPassword"],
    message: "Passwords do not match",
  });

type FormType = z.infer<typeof schema>;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const EditProfile = ({ accessToken, user }: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { api } = changePasswordApi(accessToken);
  const { mutateAsync, status: updateStatus } = useMutation(api, {
    onSuccess() {
      router.push(ROUTES.PROFILE);
    },
  });

  const onSubmit = (formData: FormType) => {
    const data: ChangeUserPasswordInput = {
      ...formData,
      userId: user.id,
    };
    toast.promise(mutateAsync(data), {
      loading: "Updating password",
      success: "Password updated",
      error: "Failed to update password",
    });

    return;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold text-slate-800">Update Password</h1>
        <main>
          <form
            className="grid items-center grid-cols-1 gap-8 px-4 py-12 mt-4 rounded shadow bg-slate-50"
            onSubmit={handleSubmit(onSubmit)}
            id="user-update-form"
          >
            <FormInput
              name="currentPassword"
              labelText="Current Password"
              error={formState.errors.currentPassword ? true : false}
              errorMessage={formState.errors.currentPassword?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.currentPassword
                    ? "input__error"
                    : "input__base"
                )}
                type="password"
                id="currentPassword"
                autoComplete="currentPassword"
                {...register("currentPassword")}
                aria-describedby="currentPassword-error"
              />
            </FormInput>

            <FormInput
              name="newPassword"
              labelText="Password"
              error={formState.errors.newPassword ? true : false}
              errorMessage={formState.errors.newPassword?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.newPassword ? "input__error" : "input__base"
                )}
                type="password"
                id="newPassword"
                autoComplete="newPassword"
                {...register("newPassword")}
                aria-describedby="newPassword-error"
              />
            </FormInput>
            <FormInput
              name="confirmPassword"
              labelText="Confirm password"
              error={formState.errors.confirmPassword ? true : false}
              errorMessage={formState.errors.confirmPassword?.message}
            >
              <input
                className={classNames(
                  "input",
                  formState.errors.confirmPassword
                    ? "input__error"
                    : "input__base"
                )}
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                {...register("confirmPassword")}
                aria-describedby="confirmPassword-error"
              />
            </FormInput>
          </form>
          <div className="flex justify-end">
            <Button
              type="submit"
              form="user-update-form"
              className="justify-center w-full mt-8 ml-auto"
              disabled={updateStatus === "loading" || formState.isSubmitting}
            >
              {updateStatus === "loading" ? (
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
    <AppLayout title="Update Password" type="signedIn">
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
