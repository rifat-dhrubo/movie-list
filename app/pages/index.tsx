import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

import { LinkButton } from "components/Button.tsx";
import AppLayout from "components/Layouts/AppLayout";
import Navbar, { SignedInNavbar } from "components/Navbar/Navbar";

const Home = () => {
  return (
    <section className="w-full max-w-5xl px-8 mx-auto md:grid md:grid-cols-2 md:gap-1 md:items-center md:mt-28">
      <div className="relative w-full max-w-md mx-auto mt-16 h-44 md:order-2 md:w-full md:h-56">
        <Image
          src="/hero.svg"
          layout="fill"
          alt="An open laptop showing a humanoid blob with paper on both hand. The background has two rectangle with question mark in center.The laptop has a postit stuck to it at them top left op the screen"
        />
      </div>
      <main className="px-8 mt-16 md:order-1 md:px-0">
        <h2 className="text-3xl font-bold text-left md:text-5xl text-slate-700">
          Delightful Movies in the Web
        </h2>
        <p className="mt-8 text-lg md:text-2xl text-slate-800">
          Are you a movie buff? Do you watch obscure movies no one hear off?
          Movie Mania is a delightful online list platform. Save your favorite
          movies, search,sort and organize them. So, what are you waiting for?
        </p>
        <div className="flex justify-center mt-8 md:justify-start ">
          <Link passHref href="/movies">
            <LinkButton size="xl">Get Started</LinkButton>
          </Link>
        </div>
      </main>
    </section>
  );
};
Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Home" type="signedOut">
      {page}
    </AppLayout>
  );
};

export default Home;
