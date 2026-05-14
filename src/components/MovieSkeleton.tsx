export const MovieSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col gap-4">
            <div className="bg-gray-700 aspect-2/3 w-full rounded-xl" />
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
    )
}