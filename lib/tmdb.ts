// This file would normally contain actual API calls to TMDB
// For this example, we're using dummy data

import axios from "axios";

export async function getMovieDetails(id: string, section: string) {
  // Simulate API call
 const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWI3YWU0NjEwYmExZDI4MTNhMjI4YmY3NTBiNjgxMCIsIm5iZiI6MTc0NDkyODgzMS4wNDMsInN1YiI6IjY4MDE4MDNmOTFkM2Y2NWM1ZmFjZWRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sotzj7WMue8zYNczk8sZ6AN7k_WWBKQ8W0aeGh6sZ7E",
    },
  };

  const singleMovie = await axios.get(url, options);
  return singleMovie.data;
}

export async function getSimilarMovies(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `similar-${i}`,
      title: `Similar Movie ${i + 1}`,
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: (Math.random() * 5 + 5).toFixed(1),
      release_date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    }))
}

export async function getGenreDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const genres = [
    { id: "1", name: "Action" },
    { id: "2", name: "Adventure" },
    { id: "3", name: "Animation" },
    { id: "4", name: "Comedy" },
    { id: "5", name: "Crime" },
    { id: "6", name: "Documentary" },
    { id: "7", name: "Drama" },
    { id: "8", name: "Family" },
    { id: "9", name: "Fantasy" },
    { id: "10", name: "History" },
  ]

  return genres.find((genre) => genre.id === id) || { id, name: `Genre ${id}` }
}

export async function getMoviesByGenre(id: string, page: number) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return Array(20)
    .fill(null)
    .map((_, i) => ({
      id: `genre-movie-${i}`,
      title: `${getGenreDetails(id).then((genre) => genre.name)} Movie ${i + 1}`,
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: (Math.random() * 5 + 5).toFixed(1),
      release_date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    }))
}

export async function getPersonDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id,
    name: `Actor Name ${id}`,
    profile_path: "/placeholder.svg?height=300&width=300",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    birthday: "1980-01-01",
    place_of_birth: "Los Angeles, California, USA",
    known_for_department: "Acting",
    deathday: null,
  }
}

export async function getPersonMovies(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `person-movie-${i}`,
      title: `Movie with Actor ${id} - ${i + 1}`,
      poster_path: "/placeholder.svg?height=450&width=300",
      vote_average: (Math.random() * 5 + 5).toFixed(1),
      release_date: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      character: `Character ${i + 1}`,
    }))
}
