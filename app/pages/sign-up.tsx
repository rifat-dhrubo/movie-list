import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

import ErrorText from "components/ErrorText";
import VisuallyHidden from "components/VisuallyHidden";

const labelClass = "flex flex-col text-merchaint-text-dark-grey text-body-1";
const inputClass =
  "relative bg-white text-merchaint-text-black-800 px-4 py-2 mt-2 border rounded border-merchaint-grey-base focus:outline-none focus:ring focus:border-transparent focus:ring-merchaint-teal-base";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  password: string;
};

const SignUp = () => {
  const labelClasses = clsx(labelClass);
  const inputClasses = clsx(inputClass);
  const [passwordInputType, setPasswordInputType] = React.useState<
    "password" | "text"
  >("password");
  const togglePasswordInputType = () => {
    setPasswordInputType(
      passwordInputType === "password" ? "text" : "password"
    );
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({});

  const onSubmit = (data: RegisterForm) => {
    console.log("🚀 ~ file: sign-up.tsx ~ line 76 ~ onSubmit ~ data", data);
  };

  return (
    <div className="grid items-center min-h-screen bg-gray-100">
      <main className="container mx-auto">
        <form
          id="registration-1"
          className="max-w-xl mx-auto space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="firstName" className={labelClasses}>
            First name
            <input
              type="text"
              id="firstName"
              className={inputClasses}
              {...register("firstName", {
                required: {
                  value: true,
                  message: "First name is required",
                },
              })}
            />
            {errors?.firstName?.message ? (
              <ErrorText text={errors.firstName.message} />
            ) : null}
          </label>
          <label htmlFor="lastName" className={labelClasses}>
            Last name
            <input
              className={inputClasses}
              type="text"
              id="lastName"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Last name is required",
                },
              })}
            />
            {errors?.lastName?.message ? (
              <ErrorText text={errors.lastName.message} />
            ) : null}
          </label>
          <label htmlFor="email" className={labelClasses}>
            Email address
            <input
              className={inputClasses}
              type="email"
              id="email"
              autoComplete="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                validate: async (value) => {
                  if (!value) return "Email is required";
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Invalid email address";
                  }
                  try {
                    // await checkEmail(value);
                    return undefined;
                  } catch (error: any) {
                    return error?.response?.status === 400
                      ? "This email is already registered"
                      : "Validation failed";
                  }
                },
              })}
            />
            {errors?.email?.message ? (
              <ErrorText text={errors.email.message} />
            ) : null}
          </label>
          <label htmlFor="tel" className={labelClasses}>
            Contact no.
            <input
              className={inputClasses}
              type="tel"
              id="tel"
              {...register("contactNo", {
                required: {
                  value: true,
                  message: "Contact number is required",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Contact no. must be only number",
                },
                minLength: {
                  value: 4,
                  message: "Contact no. must be at least 4 characters long",
                },
              })}
            />
            {errors?.contactNo?.message ? (
              <ErrorText text={errors.contactNo.message} />
            ) : null}
          </label>
          <label htmlFor="password" className={`${labelClasses} relative`}>
            Password
            <input
              className={inputClasses}
              type={passwordInputType}
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute z-10 items-center justify-center p-0 text-base font-normal leading-snug text-center bg-transparent rounded right-2 top-[2.65rem] text-slate-300"
              onClick={() => togglePasswordInputType()}
            >
              <VisuallyHidden>Show Password</VisuallyHidden>
              {passwordInputType === "password" ? (
                <HiEyeOff className="w-4 h-4 text-[#8491A1]" />
              ) : (
                <HiEye className="w-4 h-4 text-[#8491A1]" />
              )}
            </button>
            {errors?.password?.message ? (
              <ErrorText text={errors.password.message} />
            ) : null}
          </label>
        </form>
        <button
          form="registration-1"
          type="submit"
          className="w-full uppercase btn btn-primary mt-14"
        >
          Submit
        </button>
      </main>
    </div>
  );
};

export default SignUp;
