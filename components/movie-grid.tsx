"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
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

interface MovieGridProps {
  category?: string;
  genreId?: string;
  page?: number;
  section?: string;
}

export function MovieGrid({
  category,
  genreId,
  section,
  page = 1,
}: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const url = `https://api.themoviedb.org/3/${section}/${category}?language=en-US&page=${page}`;
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
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
  );
}
