"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Film, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movie" },
  { name: "TV Shows", path: "/tv" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movie"); // default to "movie"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(
        searchQuery
      )}&type=${searchType}`;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">SBN-Verse</span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center gap-3"
            >
              <div className="relative w-[200px] lg:w-[300px]">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pr-10" // padding right for icon space
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm">
                  <input
                    type="radio"
                    name="type"
                    value="movie"
                    checked={searchType === "movie"}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-1"
                  />
                  Movie
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="type"
                    value="tv"
                    checked={searchType === "tv"}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-1"
                  />
                  TV
                </label>
              </div>
            </form>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b bg-background"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="space-y-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex space-x-4">
                <label className="text-sm">
                  <input
                    type="radio"
                    name="type"
                    value="movie"
                    checked={searchType === "movie"}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-1"
                  />
                  Movie
                </label>
                <label className="text-sm">
                  <input
                    type="radio"
                    name="type"
                    value="tv"
                    checked={searchType === "tv"}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-1"
                  />
                  TV
                </label>
              </div>
            </form>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}
