import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import React from "react";

import { GetMovieByIdResponse, MovieSearchResponse } from "types/movie.type";
import { ROUTES } from "utils/routes";

type Props = {
  movie: GetMovieByIdResponse["content"];
  type?: "list" | "detail";
};

const StarDrawing = (
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#facc15",
  inactiveFillColor: "#d1d5db",
};

const MovieCard: React.FC<Props> = ({ movie, type = "list" }) => {
  if (type === "list")
    return (
      <Link passHref href={ROUTES.MOVIE_DETAILS(movie?.id ?? 0)}>
        <a className="group">
          <div className="w-full overflow-hidden rounded-lg aspect-[2/3]">
            {/* eslint-disable-next-line */}
          <img
              src={movie?.imageLink}
              alt={movie?.title}
              className="object-cover object-center w-full h-full group-hover:opacity-75"
            />
          </div>
          <div className="flex items-center justify-between mt-4 text-base font-medium text-gray-900">
            <h3>{movie?.title}</h3>
            <Rating
              style={{
                maxWidth: "112px",
              }}
              value={movie?.rating ?? 0}
              readOnly={true}
              itemStyles={customStyles}
              transition="zoom"
            />
          </div>
          <p className="mt-1 text-sm italic text-gray-500 line-clamp-1">
            {movie?.description}
          </p>
        </a>
      </Link>
    );
  else {
    return (
      <div className="group">
        <div className="w-full overflow-hidden rounded-lg aspect-[2/3]">
          {/* eslint-disable-next-line */}
        <img
            src={movie?.imageLink}
            alt={movie?.title}
            className="object-cover object-center w-full h-full group-hover:opacity-75"
          />
        </div>
        <div className="flex items-center justify-between mt-4 text-base font-medium text-gray-900">
          <h3>{movie?.title}</h3>
          <p>{movie?.rating}</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500">
          {movie?.description}
        </p>
      </div>
    );
  }
};

export default MovieCard;
