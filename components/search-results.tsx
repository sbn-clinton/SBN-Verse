import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Pagination } from "@/components/pagination";
import axios from "axios";

interface SearchResultsProps {
  query: string;
  type: "movie" | "tv";
  page?: number;
}

type Genre = {
  id: number;
  name: string;
};

interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  backdrop_path?: string;
  genres?: Genre[];
  runtime?: number;
  overview: string;
}

export async function SearchResults({
  query,
  type,
  page = 1,
}: SearchResultsProps) {
  const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
    query
  )}&page=${page}`;

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    const results: Movie[] = response.data.results;

    if (!results || results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <p className="text-muted-foreground">
          Showing results for &quot;{query}&quot; ({type.toUpperCase()})
        </p>

        <div className="space-y-6">
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/${type}/${item.id}`}
              className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={item.title || item.name || "Unknown Title"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>
                      {typeof item.vote_average === "number"
                        ? item.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  {item.release_date
                    ? new Date(item.release_date).getFullYear()
                    : item.first_air_date
                    ? new Date(item.first_air_date).getFullYear()
                    : "N/A"}
                </p>

                <p className="mt-2 line-clamp-2 text-sm md:text-base">
                  {item.overview}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination component can go here */}
        {/* <Pagination page={page} totalPages={response.data.total_pages} /> */}
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching search results:", error.message);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to fetch search results.</p>
      </div>
    );
  }
}
