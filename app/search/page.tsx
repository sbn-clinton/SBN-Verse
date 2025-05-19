import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search-results";
import { SearchForm } from "@/components/search-form";
import { LoadingMovies } from "@/components/loading-movies";

export const metadata: Metadata = {
  title: "Search Movies - CineVerse",
  description: "Search for your favorite movies and TV shows",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; type?: "movie" | "tv" };
}) {
  const query = (await searchParams).query || "";
  const type = (await searchParams).type || "movie";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Movies</h1>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchForm initialQuery={query} />
      </div>

      {query ? (
        <Suspense fallback={<LoadingMovies />}>
          <SearchResults query={query} type={type} />
        </Suspense>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Enter a movie title to search
          </p>
        </div>
      )}
    </div>
  );
}
