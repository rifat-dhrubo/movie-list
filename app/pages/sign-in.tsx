import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "components/Button.tsx/Button";
import FormInput from "components/FormInput/FormInput";
import Navbar from "components/Navbar/Navbar";
import { sessionLogin, signInApi } from "services/auth";

import { ROUTES } from "../utils/routes";

const signInSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const { redirect } = router.query;

  const { mutateAsync: sessionLoginMutation } = useMutation(sessionLogin, {
    onSuccess: () => {
      if (redirect != null && typeof redirect === "string") {
        router.push(redirect);
        return;
      }
      router.push(ROUTES.MOVIES);
    },
  });
  const { api } = signInApi();
  const { mutateAsync } = useMutation(api, {
    onSuccess: (data) => {
      toast.promise(
        sessionLoginMutation(data),
        {
          loading: `Logging in ${data.user.name}`,
          success: `Logged in ${data.user.name}`,
          error: `Failed to login ${data.user.name}`,
        },
        {
          id: "session_login",
        }
      );
    },
  });

  const onSubmit = (data: SignInForm) => {
    toast.promise(
      mutateAsync({
        email: data.email,
        password: data.password,
      }),
      {
        loading: "Verifying credentials...",
        success: "Verification successful!",
        error: "Verification failed !!",
      },
      {
        id: "login",
      }
    );
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-auth-pattern bg-auth-position">
      <Navbar />
      <div className="grid items-center min-h-app">
        <main className="w-full max-w-md px-12 mx-auto -mt-24 bg-white border shadow rounded-2xl border-grey-200 py-14">
          <header className="text-center">
            <h3 className="text-lg font-medium text-black">
              Sign in to your account
            </h3>
            <p className="mt-3 text-base font-medium text-slate-700">
              Don&apos;t have an account?{" "}
              <Link href={ROUTES.SIGN_UP} passHref>
                <a className="text-purple-700">Create an account</a>
              </Link>
            </p>
          </header>
          <form
            id="sign-in-form"
            className="space-y-3 mt-[3.25rem]"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <FormInput
              name="email"
              error={errors.email ? true : false}
              errorMessage={errors.email?.message}
              labelText="Email"
            >
              <input
                className={classNames(
                  "input",
                  errors.email ? "input__error" : "input__base"
                )}
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
                aria-describedby="email-error"
              />
            </FormInput>
            <FormInput
              name="password"
              error={errors.password ? true : false}
              errorMessage={errors.password?.message}
              labelText="Password"
            >
              <input
                className={classNames(
                  "input",
                  errors.email ? "input__error" : "input__base"
                )}
                type="password"
                id="password"
                autoComplete="password"
                {...register("password")}
                aria-describedby="password-error"
              />
            </FormInput>
          </form>
          <Button
            form="sign-in-form"
            type="submit"
            className="justify-center w-full mt-12 text-center"
            size="xl"
          >
            Sign in
          </Button>
        </main>
      </div>
    </div>
  );
};

export default SignIn;
