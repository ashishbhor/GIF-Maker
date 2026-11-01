import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadIcon from "./ui/download-icon";
import BookmarkIcon from "./ui/bookmark-icon";
import { toast } from "react-toastify";

import { toggleBookmark } from "../redux/Features/collectionSlice";

// --------------------------------------------------
// WALLHAVEN IMAGE PROXY
// --------------------------------------------------

const getDownloadUrl = (url, source) => {
  if (!url || source !== "wallhaven") return url;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "w.wallhaven.cc") {
      return `/wallhaven-image${parsedUrl.pathname}${parsedUrl.search}`;
    }

    return url;
  } catch {
    return url;
  }
};

// --------------------------------------------------
// DOWNLOAD FILE EXTENSION
// --------------------------------------------------

const getFileExtension = (blob, url, type) => {
  if (type === "gif") return "gif";

  const mimeType = blob.type?.split(";")[0];

  const mimeExtensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/gif": "gif",
  };

  if (mimeExtensions[mimeType]) {
    return mimeExtensions[mimeType];
  }

  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "webp", "avif", "gif"].includes(extension)) {
      return extension === "jpeg" ? "jpg" : extension;
    }
  } catch {
    // Use the default extension below.
  }

  return "jpg";
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.collection.bookmarks);

  const bookmarked = bookmarks.some(
    (savedItem) => savedItem.id === item.id && savedItem.type === item.type,
  );

  const [downloadStatus, setDownloadStatus] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // --------------------------------------------------
  // BOOKMARK
  // --------------------------------------------------

  const handleBookmarkClick = () => {
    if (bookmarked) {
      dispatch(toggleBookmark(item));

      toast.info(
        `${item.type === "gif" ? "GIF" : "Photo"} removed from your collection!`,
      );
    } else {
      dispatch(toggleBookmark(item));

      toast.success(
        `${item.type === "gif" ? "GIF" : "Photo"} added to your collection!`,
      );
    }
  };

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadStatus("Preparing your download...");

    try {
      // Record Unsplash download event.
      // Tracking failure should not prevent the image download.
      if (item.source === "unsplash" && item.dow) {
        fetch(item.dow, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
          },
        }).catch((error) => {
          console.warn("Unsplash download tracking failed:", error);
        });
      }

      // Highest quality first, then available alternatives.
      const candidates = [
        ...(Array.isArray(item.downloadOptions) ? item.downloadOptions : []),
        item.src,
        item.thumbnail,
      ];

      const uniqueCandidates = [
        ...new Set(
          candidates.filter((url) => typeof url === "string" && url.trim()),
        ),
      ];

      let downloadedBlob = null;
      let successfulUrl = null;
      let lastError = null;

      for (let index = 0; index < uniqueCandidates.length; index++) {
        const originalUrl = uniqueCandidates[index];

        const downloadUrl = getDownloadUrl(originalUrl, item.source);

        setDownloadStatus(
          index === 0
            ? "Downloading original quality..."
            : "Trying the next available quality...",
        );

        try {
          const response = await fetch(downloadUrl);

          if (!response.ok) {
            throw new Error(`Download failed with status ${response.status}`);
          }

          const blob = await response.blob();

          if (!blob.size) {
            throw new Error("Downloaded file is empty");
          }

          downloadedBlob = blob;
          successfulUrl = originalUrl;

          break;
        } catch (error) {
          lastError = error;

          console.warn(`Download option ${index + 1} failed:`, error);
        }
      }

      if (!downloadedBlob) {
        throw lastError || new Error("No downloadable image found");
      }

      const objectUrl = URL.createObjectURL(downloadedBlob);

      const extension = getFileExtension(
        downloadedBlob,
        successfulUrl,
        item.type,
      );

      const safeTitle = (item.title || "visual-wall-media")
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 100);

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `${safeTitle || "visual-wall-media"}.${extension}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus("Download started!");

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        setDownloadStatus("");
      }, 1500);
    } catch (error) {
      console.error("Download failed:", error);

      setDownloadStatus("Download failed. Please open the original image.");

      setTimeout(() => {
        setDownloadStatus("");
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="group w-full overflow-hidden rounded-lg bg-gray-900 shadow-sm transition hover:shadow-lg">
      {/* Media Preview */}
      <div className="relative overflow-hidden">
        <a
          href={item.url || item.src}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {item.type === "photo" && (
            <img
              src={item.thumbnail}
              alt={item.title || "Photo"}
              width={item.width || undefined}
              height={item.height || undefined}
              loading="lazy"
              decoding="async"
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
              decoding="async"
              className="block h-auto w-full object-cover"
            />
          )}
        </a>

        {(item.type === "photo" || item.type === "gif") && (
          <>
            {/* Download */}
            <button
              type="button"
              aria-label="Download media"
              disabled={isDownloading}
              onClick={handleDownload}
              className="absolute bottom-3 left-3 z-10 flex h-9.5 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all duration-300 hover:bg-green-500 group-hover:opacity-100 active:scale-95 disabled:cursor-wait disabled:opacity-100"
            >
              {isDownloading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <DownloadIcon className="h-6 w-6" />
              )}
            </button>

            {/* Bookmark */}
            <button
              type="button"
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark media"}
              aria-pressed={bookmarked}
              onClick={handleBookmarkClick}
              className={`absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-blue-700 group-hover:opacity-100 active:scale-95 ${
                bookmarked ? "bg-blue-500 opacity-100" : "bg-black/60 opacity-0"
              }`}
            >
              <BookmarkIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Media Title */}
      <div className="px-2 py-1.5">
        <h3 className="truncate text-xs font-medium text-white">
          {item.title || "Untitled"}
        </h3>
      </div>

      {/* Download Status */}
      {downloadStatus && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-5 z-9999 -translate-x-1/2 rounded-xl border border-white/20 bg-gray-900/95 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-md"
        >
          <span className="mr-2">⬇</span>
          {downloadStatus}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
