import { Suspense } from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { MovieGrid } from "@/components/movie-grid";
import { LoadingMovies } from "@/components/loading-movies";
import { PopularMovieCarousel } from "@/components/popular-movie-carousel";
import { AllTrendingCarousel } from "@/components/all-trending";

export const metadata: Metadata = {
  title: "SBN-Verse - Home",
  description: "Discover the latest and greatest movies and TV shows",
};

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
        <Suspense fallback={<LoadingMovies />}>
          <AllTrendingCarousel category="trending" section="all" />
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
        <Suspense fallback={<LoadingMovies />}>
          <PopularMovieCarousel category="popular" section="movie" />
        </Suspense>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Upcoming Releases</h2>
        <Suspense fallback={<LoadingMovies />}>
          <MovieGrid category="upcoming" section="movie" page={1} />
        </Suspense>
      </section>
    </div>
  );
}
