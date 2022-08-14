import React from "react";

import {
  GetMovieByIdResponse,
  Movie,
  MovieSearchResponse,
} from "types/movie.type";
import { ROUTES } from "utils/routes";

type Props = {
  movie: GetMovieByIdResponse["content"];
  type?: "list" | "detail";
};

const MovieCard: React.FC<Props> = ({ movie, type = "list" }) => {
  if (type === "list")
    return (
      <a href={ROUTES.MOVIE_DETAILS(movie?.id ?? 0)} className="group">
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
        <p className="mt-1 text-sm italic text-gray-500 line-clamp-1">
          {movie?.description}
        </p>
      </a>
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
