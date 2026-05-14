import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { MovieInfo } from "../components/MovieInfo";
import { MovieRecommendations } from "../components/MovieRecommendations";
import { MovieCast } from "../components/MovieCast";

const fetchMovieDetails = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
}

const fetchRecommendations = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}/recommendations`);
  return data.results;
}

const fetchMovieCast = async (movieId: string) => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data.cast.slice(0, 10);
}
 
const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });

  const { data: recommendations, isLoading: isRecLoading } = useQuery ({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchRecommendations(id!),
    enabled: !!id,
  });

  const { data: cast, isLoading: isCastLoading } = useQuery({
    queryKey: ['movie-cast', id],
    queryFn: () => fetchMovieCast(id!),
    enabled: !!id
  })

  if (isLoading) return <div>Загрузка информации...</div>
  if (isError) return <div>Ошибка <Link to="/">Вернуться назад</Link></div>
  if (!movie) return null;
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="inline-block mb-8 text-gray-400 hover:text-white transition-colors">← Вернуться назад</Link>
      <MovieInfo movie={movie} />
      <MovieCast cast={cast} isLoading={isCastLoading} />
      <MovieRecommendations movies={recommendations} isLoading={isRecLoading} />
       {/* 
        To Do 
        <MovieCast /> 
        &
        <MovieRecommendations />
         */}
    </div>
  );
};

export default MoviePage;
