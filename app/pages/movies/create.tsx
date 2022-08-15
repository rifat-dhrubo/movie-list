import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@smastrom/react-rating";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import Button from "components/Button.tsx/Button";
import FormInput from "components/FormInput/FormInput";
import AppLayout from "components/Layouts/AppLayout";
import MovieForm from "components/MovieForm/MovieForm";
import { withSessionSsr } from "lib/auth/session";
import { createMovie } from "services/movie";
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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const StarDrawing = (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#facc15",
  inactiveFillColor: "#d1d5db",
};

const Create = ({ accessToken, user }: Props) => {
  const { register, handleSubmit, formState, control, reset } =
    useForm<FormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        rating: 0,
      },
    });
  const { api } = createMovie(accessToken);
  const { mutateAsync, status } = useMutation(api, {
    onSuccess: () => {
      reset({
        rating: 0,
      });
    },
  });
  const onSubmit = (formData: FormType) => {
    toast.promise(
      mutateAsync({
        ...formData,
        userId: user.id,
      }),
      {
        loading: "Creating movie",
        success: "Movie created",
        error: "Failed to create movie",
      }
    );
  };
  return <MovieForm accessToken={accessToken} user={user} type="create" />;
};

Create.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Create" type="signedIn">
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

export default Create;
