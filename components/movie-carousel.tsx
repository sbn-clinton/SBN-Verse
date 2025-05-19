"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  original_title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
}

interface MovieCarouselProps {
  category?: string;
  movieId?: string;
  personId?: string;
  section?: string;
}

export function MovieCarousel({
  category,
  movieId,
  personId,
  section,
}: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const url = `https://api.themoviedb.org/3/${category}/${section}/day?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`, // use .env for security
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(url, options);
      const data = await response.data;
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount =
        direction === "left"
          ? -current.clientWidth / 2
          : current.clientWidth / 2;

      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ y: -5 }}
            className="flex-none w-[180px] md:w-[220px] snap-start"
          >
            <Link href={`/${section}/${movie.id}`}>
              <Card className="overflow-hidden bg-muted/40 hover:bg-muted/60 transition-colors">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={movie.title || movie.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {typeof movie.vote_average === "number" &&
                    !isNaN(movie.vote_average)
                      ? (movie.vote_average as number).toFixed(1)
                      : "N/A"}
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium line-clamp-1">
                    {movie.title || movie.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      movie.release_date || movie.first_air_date
                    ).getFullYear()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 backdrop-blur-sm"
        )}
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Scroll left</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 backdrop-blur-sm"
        )}
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  );
}
