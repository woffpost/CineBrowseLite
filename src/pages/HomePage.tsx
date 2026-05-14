import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import api from "../api/axios";
import { Link } from "react-router-dom";
import { MovieSkeleton } from "../components/MovieSkeleton";
import { Film } from "lucide-react";
import type { Movie, Genre } from "@/types/movies";
import { TMDB_IMAGE_W200 } from "@/constants/tmdb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select"

const fetchGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data.genres;
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { ref, inView } = useInView();
  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const { 
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["movies", debouncedSearchTerm, selectedGenre],
    queryFn: async ({pageParam = 1}) => {
      if (debouncedSearchTerm) {
        const { data } = await api.get("/search/movie", {
          params: { query: debouncedSearchTerm, page: pageParam },
        });
        return data;
      }

      const endpoint = selectedGenre ? "/discover/movie" : "/movie/popular";
      const { data } = await api.get(endpoint, {
        params: { with_genres: selectedGenre, page: pageParam },
      });
      return data;
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    }
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const movies = data?.pages.flatMap((page) => page.results) || [];
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Популярные фильмы</h1>

      <div className="mb-12 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Поиск фильмов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-800 border-gray-700 focus:border-red-500 outline-none transition-all text-white"
        />
      </div>

      <div className="mb-10 max-w-xs mx-auto flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 px-1">
          <Film className="w-3.5 h-3.5 text-red-500" />
          Жанр
        </label>

        <Select
          value={selectedGenre ? String(selectedGenre) : "all"}
          onValueChange={(value) => {
            setSearchTerm("");
            setSelectedGenre(value === "all" ? null : Number(value));
          }}
        >
          <SelectTrigger className="w-full h-11 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-red-500/40 focus:border-red-500 hover:border-gray-600 transition-all duration-200 px-4 text-sm font-medium cursor-pointer flex justify-between items-center outline-none">
            <SelectValue placeholder="Выберите жанр" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border border-gray-800 text-white rounded-xl shadow-2xl p-1.5 min-w-trigger-width" position="popper" sideOffset={6}>
            <SelectItem value="all" className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors">
              🍿 Все жанры
            </SelectItem>
            {genres?.map((genre: Genre) => (
              <SelectItem key={genre.id} value={String(genre.id)} className="text-gray-300 focus:bg-red-600 focus:text-white cursor-pointer py-2.5 px-3 rounded-lg text-sm font-medium outline-none transition-colors">
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <MovieSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies?.map((movie: Movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                <img
                  className="w-full h-auto"
                  src={`${TMDB_IMAGE_W200}/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="p-4">
                  <p className="font-semibold text-lg truncate group-hover:text-red-500 transition-colors">
                    {movie.title}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {movie.release_date.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* <div ref={ref} className="mt-10 h-10 flex items-center justify-center text-gray-400">
            {isFetchingNextPage && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
                {[...Array(5)].map((_, i) => <MovieSkeleton key={i} /> )}
              </div>
            )}
            {!hasNextPage && movies.length > 0 && <p className="text-sm italic text-gray-500">Вы просмотрели все фильмы</p> }
          </div> */}

          {isFetchingNextPage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6 w-full">
              {[...Array(5)].map((_, i) => (
                <MovieSkeleton key={i} />
              ))}
            </div>
          )}

          <div ref={ref} className="h-10 w-full"></div>

          {!hasNextPage && movies.length > 0 && (
            <p className="text-sm italic text-gray-500">
              Вы просмотрели все фильмы
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default HomePage;
