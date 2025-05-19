"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  initialQuery?: string;
  initialType?: "movie" | "tv";
}

export function SearchForm({
  initialQuery = "",
  initialType = "movie",
}: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<"movie" | "tv">(initialType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}&type=${type}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder={`Search for ${type}s...`}
          className="pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="movie"
            checked={type === "movie"}
            onChange={() => setType("movie")}
          />
          Movie
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="tv"
            checked={type === "tv"}
            onChange={() => setType("tv")}
          />
          TV Show
        </label>
      </div>
    </form>
  );
}
