const ResultCard = ({ item }) => {
    return (
        <div className="group w-full overflow-hidden rounded-lg bg-gray-900 shadow-sm transition hover:shadow-lg">
            <div className="px-2 py-1.5">
                <h3 className="truncate text-xs font-medium text-white">
                    {item.title || "Untitled"}
                </h3>
            </div>
            {item.type === "photo" && (
                <img
                    src={item.thumbnail}
                    alt={item.title || "Photo"}
                    loading="lazy"
                    className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            )}

            {item.type === "video" && (
                <video
                    src={item.src}
                    poster={item.thumbnail}
                    controls
                    preload="metadata"
                    playsInline
                    className="block h-auto w-full object-cover"
                />
            )}

            {item.type === "gif" && (
                <img
                    src={item.src}
                    alt={item.title || "GIF"}
                    loading="lazy"
                    className="block h-auto w-full object-cover"
                />
            )}

        </div>
    );
};

export default ResultCard;