"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CastSectionProps {
  movieId: string;
  category?: string;
}

export function CastSection({ movieId, category }: CastSectionProps) {
  const [cast, setCast] = useState<any[]>([]);
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`, // use .env for security
    },
  };

  useEffect(() => {
    const fetchCast = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      setCast(data.cast);
    };
    fetchCast();
  }, []);
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Cast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((person, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="block overflow-hidden rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
              <div className="relative aspect-square">
                <Image
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "/placeholder.svg"
                  }
                  alt={person.title || person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium line-clamp-1">{person.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {person.character || ""}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
