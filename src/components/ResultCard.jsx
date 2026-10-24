import DownloadIcon from "./ui/download-icon";
import { useState } from "react";

const ResultCard = ({ item }) => {
  const [downloadStatus, setDownloadStatus] = useState("");
  const handleDownload = async (item) => {
    setDownloadStatus("Preparing your download...");

    try {
      // Unsplash download tracking (don't block the file download)
      if (item.type === "photo" && item.dow) {
        fetch(item.dow, {
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }).catch(console.error);
      }

      const response = await fetch(item.src);

      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;

      const extension = item.type === "gif" ? "gif" : "jpg";

      link.download = `${item.title || "media"}.${extension}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus("Download started!");

      setTimeout(() => {
        setDownloadStatus("");
        URL.revokeObjectURL(objectUrl);
      }, 500);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadStatus("Download failed. Please try again.");

      setTimeout(() => setDownloadStatus(""), 2500);
    }
  };

  return (
    <div className="group w-full overflow-hidden rounded-lg bg-gray-900 shadow-sm transition hover:shadow-lg">
      <div className="px-2 py-1.5">
        <h3 className="truncate text-xs font-medium text-white">
          {item.title || "Untitled"}
        </h3>
      </div>
      <div className="relative overflow-hidden">
        <a href={item.url} target="_blank" rel="noreferrer" className="block">
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
        {(item.type === "photo" || item.type === "gif") && (
          <button
            type="button"
            aria-label="Download media"
            onClick={() => handleDownload(item)}
            className="absolute bottom-3 left-3 z-10
                    flex h-10 w-10 items-center justify-center
                    rounded-full bg-black/60 text-white
                    opacity-0 transition-all duration-300
                    hover:bg-green-500
                    group-hover:translate-y-0
                    group-hover:opacity-100"
          >
            <DownloadIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      {downloadStatus && (
        <div
          role="status"
          className="fixed left-1/2 top-5 z-9999
                    -translate-x-1/2
                    rounded-xl border border-white/20
                    bg-gray-900/95 px-5 py-3
                    text-lg font-medium text-white
                    shadow-2xl backdrop-blur-md
                    animate-in fade-in slide-in-from-top-2"
        >
          <span className="mr-2">⬇</span>
          {downloadStatus}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
