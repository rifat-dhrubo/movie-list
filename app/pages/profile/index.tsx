import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";

import { LinkButton } from "components/Button.tsx";
import AppLayout from "components/Layouts/AppLayout";
import MovieForm from "components/MovieForm/MovieForm";
import { withSessionSsr } from "lib/auth/session";
import { ROUTES } from "utils/routes";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Profile = ({ accessToken, user }: Props) => {
  return (
    <div className="bg-white ">
      <h1 className="container mx-auto my-8 text-2xl font-bold text-slate-800">
        Profile
      </h1>
      <div className="container px-8 py-8 mx-auto rounded shadow bg-slate-50">
        <main className="">
          <header className="flex justify-end gap-5 my-4">
            <Link href={ROUTES.EDIT_PROFILE}>
              <LinkButton size="xl" className="cursor-pointer">
                Edit Profile
              </LinkButton>
            </Link>
            <Link href={ROUTES.EDIT_PASSWORD}>
              <LinkButton size="xl" className="cursor-pointer">
                Edit Password
              </LinkButton>
            </Link>
          </header>

          <article className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            <div>
              <p className="text-lg text-slate-700">Name</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-700">{user.name}</p>
            </div>
            <div>
              <p className="text-lg text-slate-700">Email</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-700">{user.email}</p>
            </div>
            <div>
              <p className="text-lg text-slate-700">Password</p>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-700">
                ***************
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

Profile.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Profile" type="signedIn">
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

export default Profile;
