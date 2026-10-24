const ResultCard = ({ item }) => {
    return (
        <div className="group w-full overflow-hidden rounded-lg bg-gray-900 shadow-sm transition hover:shadow-lg">
            <div className="px-2 py-1.5">
                <h3 className="truncate text-xs font-medium text-white">
                    {item.title || "Untitled"}
                </h3>
            </div>
            <div className="relative overflow-hidden">
                <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                >
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
                </a>
                <button
                    type="button"
                    onClick={() => {
                        const link = document.createElement("a");
                        link.href = item.dow;
                        link.download = `${item.title || "media"}.${item.type === "video" ? "mp4" : "gif"}`;
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        link.click();
                    }}
                    className="absolute bottom-3 left-3 z-10
                    translate-y-2 opacity-0
                    rounded-lg border border-white/30
                    bg-white/20 px-4 py-2
                    text-sm font-semibold text-white
                    shadow-lg backdrop-blur-md
                    transition-all duration-300
                    hover:bg-green-500
                    group-hover:translate-y-0
                    group-hover:opacity-100"
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
