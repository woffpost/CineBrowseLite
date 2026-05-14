import { TMDB_IMAGE_W500 } from "@/constants/tmdb";
import { Link } from "react-router-dom";

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CastProps {
    cast: CastMember[] | undefined;
    isLoading: boolean;
}

export const MovieCast = ({ cast, isLoading}: CastProps) => {
    if (isLoading) return <div className="mt-12 text-gray-400">Загрузка актерского состава...</div>
    if (!cast || cast.length === 0) return null;

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">В главных ролях</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin">
                {cast.map((actor: CastMember) => (
                    <Link 
                        key={actor.id} 
                        to={`/actor/${actor.id}`}
                        className="min-w-30 text-center flex flex-col items-center"
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 shadow-md mb-2">
                            {actor.profile_path ? (
                                <img src={`${TMDB_IMAGE_W500}/${actor.profile_path}`} alt={actor.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 bg-gray-700">
                                    Нет фото
                                </div>
                            )}
                        </div>
                    
                        <p className="font-semibold text-sm line-clamp-1 text-white group-hover:text-red-500 transition-colors">
                            {actor.name}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-1">{actor.character}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}