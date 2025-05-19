import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";
import { MovieCarousel } from "@/components/movie-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Calendar, Clock } from "lucide-react";
import { CastSection } from "@/components/cast-section";
import { LoadingMovieDetails } from "@/components/loading-movie-details";
import { LoadingMovies } from "@/components/loading-movies";
import axios from "axios";
import { SimilarMovieCarousel } from "@/components/similar-movie-carousel";

type Genre = {
  id: number;
  name: string;
};
interface Movie {
  id: string;
  title: string;
  original_title: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  genres: Genre[];
  runtime: number;
  overview: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const movieId = (await params).id;
  const section = "movie";
  const movie = await getMovieDetails(movieId, section);

  return {
    title: `${movie.title} - CineVerse`,
    description: movie.overview,
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movieId = (await params).id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`, // use .env for security
    },
  };

  const singleMovie = await axios.get(url, options);
  const movie = singleMovie.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[50vh] w-full rounded-xl overflow-hidden mb-8">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{movie.runtime} min</span>
            </div>
          </div>

          <p className="text-lg">{movie.overview}</p>

          <div className="flex gap-4 pt-4">
            <Button size="lg">Watch Trailer</Button>
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-5 w-5" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingMovieDetails />}>
        <CastSection movieId={movieId} category="movie" />
      </Suspense>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Similar Movies</h2>
        <Suspense fallback={<LoadingMovies />}>
          <SimilarMovieCarousel
            movieId={movieId}
            category="similar"
            section="movie"
          />
        </Suspense>
      </section>
    </div>
  );
}
