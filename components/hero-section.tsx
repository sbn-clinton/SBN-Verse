"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import axios from "axios";

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
  overview: string;
}

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const url = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`, // use .env for security
    },
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(url, options);
        const results = response.data.results || [];
        setTrendingMovies(results.slice(0, 4)); // only keep the first four
      } catch (error) {
        console.log("Error fetching trending movies:", error);
      }
    };

    fetchTrending();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!trendingMovies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [trendingMovies]);

  const currentMovie = trendingMovies[currentIndex];

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        {currentMovie && (
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={
                currentMovie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
                  : "/placeholder.svg"
              }
              alt={currentMovie.title || currentMovie.name || "Movie"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    >
                      {currentMovie.title || currentMovie.name}
                    </motion.h1>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-muted-foreground max-w-xl"
                    >
                      {currentMovie.overview}
                    </motion.p>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-4 pt-4"
                    >
                      <Button size="lg" className="gap-2">
                        <Play className="h-5 w-5" />
                        Watch Trailer
                      </Button>
                      <div>
                        <Button size="lg" variant="outline" className="gap-2">
                          <Info className="h-5 w-5" />
                          More Info
                        </Button>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:block relative aspect-[2/3] max-w-[300px] ml-auto"
                  >
                    <Image
                      src={
                        currentMovie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`
                          : "/placeholder.svg"
                      }
                      alt={currentMovie.title || currentMovie.name}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {trendingMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-6" : "bg-muted"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
