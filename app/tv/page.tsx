import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MovieCarousel } from "@/components/movie-carousel";
import { MovieGrid } from "@/components/movie-grid";
import { LoadingMovies } from "@/components/loading-movies";
import { PopularMovieCarousel } from "@/components/popular-movie-carousel";

export const metadata: Metadata = {
  title: "SBN-Verse - TV Series",
  description: "Discover the latest and greatest TV Series ",
};

export default async function TV() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <Suspense fallback={<LoadingMovies />}>
          <MovieCarousel category="trending" section="tv" />
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">On The Air</h2>
        <Suspense fallback={<LoadingMovies />}>
          <PopularMovieCarousel category="on_the_air" section="tv" />
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>
        <Suspense fallback={<LoadingMovies />}>
          <MovieGrid category="top_rated" section="tv" page={1} />
        </Suspense>
      </section>
    </div>
  );
}
