import { TMDB_IMAGE_W500 } from "@/constants/tmdb";

interface MovieGenres {
  name: string;
}
interface MovieInfoProps {
  movie: {
    title: string;
    budget: number;
    release_date: string;
    tagline: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    runtime: number;
    genres: MovieGenres[]
  };
  
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  if (!movie) return <div>Нет данных о фильме</div>;
  return (
    <div className="flex gap-10">
      <img
        src={`${TMDB_IMAGE_W500}/${movie.poster_path}`}
        alt={movie.title}
        className="w-full md:w-1/3 rounded-2xl shadow-2xl"
      />

      <div className="flex flex-col gap-10">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold mb-4">
            {movie.title}{" "}
            <span className="text-gray-400 text-2xl">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>
          <p className="text-xl text-gray-400 italic mb-6">{movie.tagline}</p>

          <div className="flex gap-4 mb-8">
            <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md">
              IMDb {movie?.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded-md">
              {movie?.release_date
                ? movie.release_date.split("-")[0]
                : "Нет данных"}
            </span>
            <span className="border border-gray-600 px-3 py-1 rounded-md">
              {movie.runtime} min
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-3">О фильме</h3>
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          {movie.overview}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Жанры</p>
            <p>{movie.genres?.map((g: MovieGenres) => g.name).join(", ")}</p>
          </div>
          <div>
            <p className="text-gray-500">Бюджет</p>
            <p>${movie.budget?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
