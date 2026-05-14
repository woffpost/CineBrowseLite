import { Link } from "react-router-dom";
import type { Movie } from "@/types/movies";
import { TMDB_IMAGE_W500 } from "@/constants/tmdb";

// interface Movie {
//     id: number;
//     title: string;
//     poster_path: string | null;
// }

interface MovieRecommendationsProps {
    movies: Movie[] | undefined;
    isLoading: boolean;
}

export const MovieRecommendations = ({ movies, isLoading}: MovieRecommendationsProps) => {
    if (isLoading) {
        return <div className="mt-12 text-gray-400">Загрузка рекомендаций...</div>
    }

    if (!movies || movies.length === 0) {
        return null
    }

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Похожие фильмы</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-700">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        className="min-w-40 sm:min-w-50 group block"
                    >
                        <div className="overflow-hidden rounded-xl bg-gray-800 aspect-2/3 shadow-lg transition-transform duration-200 group-hover:scale-105">
                            {movie.poster_path ? (
                                <img src={`${TMDB_IMAGE_W500}${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm p-4 text-center">
                                    Нет изображения
                                </div>
                            )}
                        </div>
                        <p className="mt-3 font-medium text-sm sm:text-base truncate group-hover:text-red-500 transition-colors">
                            {movie.title}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}