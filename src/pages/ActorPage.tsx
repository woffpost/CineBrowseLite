import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import type { Movie } from "@/types/movies";
import { TMDB_IMAGE_W200 } from "@/constants/tmdb";


const fetchActorDetails = async (id: string) => {
    const { data } = await api.get(`/person/${id}`);
    return data;
}
const fetchActorMovies = async (id: string) => {
    const { data } = await api.get(`/person/${id}/movie_credits`);

    return data.cast
      .sort((a: Movie, b: Movie) => (b.popularity ?? 0) - (a.popularity ?? 0))
      .slice(0, 10);
};

const ActorPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: actor, isLoading: isActorLoading, isError} = useQuery({
        queryKey: ["actor", id],
        queryFn: () => fetchActorDetails(id!),
        enabled: !!id,
    })

    const { data: movies, isLoading: isMoviesLoading } = useQuery({
        queryKey: ["actor-movies", id],
        queryFn: () => fetchActorMovies(id!),
        enabled: !!id,
    })

    if (isActorLoading) return <div className="text-center p-10 text-xl">Загрузка профиля...</div>
    if (isError) return <div className="text-center p-10">Ошибка загрузки. <Link to={'/'} className="text-red-500">На главную</Link></div>

    
    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            <button onClick={() => navigate(-1)} className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">
                ← Назад
            </button>

            {/* Основной блок актера */}
            <div className="flex flex-col md:flex-row gap-10 mb-16">
                <img
                    src={`${TMDB_IMAGE_W200}/${actor?.profile_path}`}
                    alt={actor?.name}
                    className="w-full md:w-75 h-112.5 object-cover rounded-2xl shadow-2xl shadow-black/40"
                />
                <div className="flex-1">
                    <h1 className="text-5xl font-extrabold mb-4">{actor?.name}</h1>
                    <p className="text-gray-400 text-sm mb-6">
                        Родился(ась): {actor?.birthday} {actor?.place_of_birth && `в ${actor?.place_of_birth}`}
                    </p>
                    <h3 className="text-2xl font-semibold mb-3">Биография</h3>
                    <p className="text-gray-300 leading-relaxed text-base">
                        {actor?.biograpyh || "Биография актера на данном языке отсутствует"}
                    </p>
                </div>
            </div>

            {/* Блок фильмов актера */}
            <div>
                <h2 className="text-3xl font-bold mb-6">Известен по фильмам</h2>
                {isMoviesLoading ? (
                    <div className="text-gray-400">Загрузка фильмов...</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {movies?.map((movie: Movie) => (
                            <Link
                                key={movie.id}
                                to={`/movie/${movie.id}`}
                                className="group bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 shadow-lg"
                            >
                                <div className="aspect-2/3 bg-gray-700 overflow-hidden">
                                    {movie.poster_path ? (
                                        <img 
                                            src={`${TMDB_IMAGE_W200}/${movie.poster_path}`} 
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">Нет постера</div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="font-semibold text-sm truncate group-hover:text-red-500 transition-colors">{movie.title}</p>
                                    <p className="text-gray-400 text-xs mt-1">как {movie.character || "самого себя"}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default ActorPage;