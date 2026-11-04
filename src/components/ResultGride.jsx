import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, LoaderCircle } from "lucide-react";

import {
  fetchGIF,
  fetchPhotos,
  fetchVideos,
  fetchWallhavenPhotos,
  normalizeUnsplashPhoto,
  normalizeWallhavenPhoto,
} from "../api/mediaApi";

import {
  setLoading,
  setError,
  setResults,
  setInitialPhotoResults,
  appendPhotoResults,
  setPhotoSourceExhausted,
  setLoadingMore,
} from "../redux/Features/searchSlice";

import ResultCard from "./ResultCard";

const loadingMessages = [
  "Hold on… pixels are getting dressed. 👀",
  "Downloading good vibes… not your patience.",
  "Making your screen less boring… 🎨",
  "The pixels are having a meeting. BRB.",
  "Fetching awesomeness from the internet… 🚀",
  "Almost there… even pixels need coffee. ☕",
  "Loading eye candy… please don't blink.",
  "Our pixels are running, not walking… 🏃",
  "Good things take time. Bad Wi-Fi takes longer. 💀",
  "Assembling your next obsession...",
];

const BATCH_SIZE = 15;

const getColumnCount = () => {
  if (typeof window === "undefined") return 2;

  if (window.innerWidth >= 1280) return 5;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 3;

  return 2;
};

const distributeMedia = (media, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => []);

  const columnHeights = Array(columnCount).fill(0);

  media.forEach((item) => {
    let shortestColumn = 0;

    for (let i = 1; i < columnCount; i += 1) {
      if (columnHeights[i] < columnHeights[shortestColumn]) {
        shortestColumn = i;
      }
    }

    columns[shortestColumn].push(item);

    const ratio =
      Number(item.aspectRatio) > 0
        ? Number(item.aspectRatio)
        : Number(item.width) > 0 && Number(item.height) > 0
          ? Number(item.width) / Number(item.height)
          : 1;

    columnHeights[shortestColumn] += 1 / Math.max(ratio, 0.1) + 0.15;
  });

  return columns;
};

const normalizeVideo = (item) => {
  const videoFile = (item.video_files || [])
    .filter(
      (file) =>
        file.file_type === "video/mp4" &&
        file.link &&
        file.width &&
        file.height,
    )
    .sort((a, b) => b.width - a.width)[0];

  if (!videoFile) return null;

  const width = videoFile.width;
  const height = videoFile.height;

  return {
    id: `pexels-${item.id}`,
    type: "video",
    source: "pexels",
    title: item.user?.name || "Video",
    thumbnail: item.image || "",
    src: videoFile.link,
    width,
    height,
    aspectRatio: width / height,
    url: item.url || "",
    dow: videoFile.link,
  };
};

const normalizeGIF = (item) => {
  const images = item.images || {};

  // Small image for fast loading in the grid
  const thumbnail =
    images.fixed_width_small?.url ||
    images.preview_gif?.url ||
    images.fixed_width?.url ||
    "";

  // Optimized GIF for displaying in the grid
  const preview =
    images.fixed_width?.url ||
    images.downsized_medium?.url ||
    images.downsized?.url ||
    images.original?.url ||
    "";

  // Original GIF for downloading
  const original = images.original?.url || images.downsized?.url || preview;

  if (!preview) return null;

  const width = Number(
    images.fixed_width?.width ||
      images.downsized_medium?.width ||
      images.original?.width ||
      0,
  );

  const height = Number(
    images.fixed_width?.height ||
      images.downsized_medium?.height ||
      images.original?.height ||
      0,
  );

  return {
    id: `giphy-${item.id}`,
    type: "gif",
    source: "giphy",
    title: item.title || "GIF",
    thumbnail: thumbnail || preview,
    src: preview,
    downloadOptions: [original, preview],
    width: width || null,
    height: height || null,
    aspectRatio: width > 0 && height > 0 ? width / height : null,
    url: item.url || item.embed_url || "",
    dow: original,
  };
};

const removeDuplicates = (items) => {
  const uniqueItems = new Map();

  items.forEach((item) => {
    if (item?.id) {
      uniqueItems.set(item.id, item);
    }
  });

  return Array.from(uniqueItems.values());
};

const getUnsplashBatch = async (query, page) => {
  const response = await fetchPhotos(query, page, BATCH_SIZE);

  const items = (response.results || [])
    .map(normalizeUnsplashPhoto)
    .filter((item) => item.thumbnail && item.src);

  return {
    items,
    hasMore: page < (response.total_pages || 0),
  };
};

const getWallhavenBatch = async (query, page) => {
  const response = await fetchWallhavenPhotos(query, page);

  const items = (response.data || [])
    .map(normalizeWallhavenPhoto)
    .filter((item) => item.thumbnail && item.src);

  const lastPage = Number(response.meta?.last_page);

  return {
    items,
    hasMore: lastPage > 0 ? page < lastPage : items.length >= 24,
  };
};

const getVideoBatch = async (query, page) => {
  const response = await fetchVideos(query, page, BATCH_SIZE);

  const items = (response.videos || []).map(normalizeVideo).filter(Boolean);

  const totalResults = Number(response.total_results || 0);

  return {
    items,
    hasMore: response.next_page ? true : totalResults > page * BATCH_SIZE,
  };
};

const getGIFBatch = async (query, page) => {
  const response = await fetchGIF(query, page, BATCH_SIZE);

  const items = (response.data || []).map(normalizeGIF).filter(Boolean);

  const totalCount = Number(response.pagination?.total_count || 0);

  return {
    items,
    hasMore: totalCount > page * BATCH_SIZE,
  };
};

function ResultGride() {
  const dispatch = useDispatch();

  const {
    query,
    activeTab,
    results,
    loading,
    loadingMore,
    error,
    unsplashPage,
    wallhavenPage,
    hasMoreUnsplash,
    hasMoreWallhaven,
    nextPhotoSource,
  } = useSelector((store) => store.search);

  const [loadingMessage] = useState(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );

  const [showTopButton, setShowTopButton] = useState(false);

  // Responsive columns
  const [columnCount, setColumnCount] = useState(getColumnCount);

  // Video/GIF pagination
  const [mediaPage, setMediaPage] = useState(2);
  const [hasMoreMedia, setHasMoreMedia] = useState(true);
  const [mediaLoadingMore, setMediaLoadingMore] = useState(false);
  const [mediaPaginationError, setMediaPaginationError] = useState("");

  // Photo pagination error
  const [photoPaginationError, setPhotoPaginationError] = useState("");

  // Infinite scroll
  const sentinelRef = useRef(null);

  // Prevent duplicate requests
  const requestLockRef = useRef(false);

  // Cancel outdated requests logically
  const requestSequenceRef = useRef(0);
  const queryRef = useRef(query);

  // Prefetch cache for photos
  const cacheRef = useRef({});

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const mediaColumns = useMemo(
    () => distributeMedia(results, columnCount),
    [results, columnCount],
  );

  const prefetchBatch = useCallback((source, page, searchQuery) => {
    const key = `${searchQuery}:${source}:${page}`;

    if (cacheRef.current[key]) {
      return cacheRef.current[key];
    }

    const request =
      source === "unsplash"
        ? getUnsplashBatch(searchQuery, page)
        : getWallhavenBatch(searchQuery, page);

    const promise = request.catch((err) => {
      delete cacheRef.current[key];
      throw err;
    });

    cacheRef.current[key] = promise;

    return promise;
  }, []);

  useEffect(() => {
    if (!query?.trim()) return;

    let cancelled = false;

    queryRef.current = query;

    requestSequenceRef.current += 1;
    requestLockRef.current = false;

    cacheRef.current = {};

    /* eslint-disable react-hooks/set-state-in-effect */
    setMediaPage(2);
    setHasMoreMedia(true);
    setMediaLoadingMore(false);
    setMediaPaginationError("");
    setPhotoPaginationError("");
    /* eslint-enable react-hooks/set-state-in-effect */

    const getData = async () => {
      dispatch(setLoading());

      try {
        if (activeTab === "photos") {
          const [unsplashResult, wallhavenResult] = await Promise.allSettled([
            getUnsplashBatch(query, 1),
            prefetchBatch("wallhaven", 1, query),
          ]);

          if (cancelled || queryRef.current !== query) return;

          if (unsplashResult.status === "rejected") {
            throw unsplashResult.reason;
          }

          const initialBatch = unsplashResult.value;

          dispatch(
            setInitialPhotoResults({
              results: initialBatch.items,
              hasMore: initialBatch.hasMore,
            }),
          );

          if (!initialBatch.hasMore || !initialBatch.items.length) {
            dispatch(setPhotoSourceExhausted("unsplash"));
          }

          if (wallhavenResult.status === "fulfilled") {
            const wallhavenBatch = wallhavenResult.value;

            if (!wallhavenBatch.hasMore || !wallhavenBatch.items.length) {
              dispatch(setPhotoSourceExhausted("wallhaven"));
            }
          } else {
            console.error("Wallhaven prefetch failed:", wallhavenResult.reason);
          }

          return;
        }

        if (activeTab === "videos") {
          const batch = await getVideoBatch(query, 1);

          if (cancelled || queryRef.current !== query) return;

          setHasMoreMedia(batch.hasMore);

          dispatch(setResults(batch.items));

          return;
        }

        if (activeTab === "gif") {
          const batch = await getGIFBatch(query, 1);

          if (cancelled || queryRef.current !== query) return;

          setHasMoreMedia(batch.hasMore);

          dispatch(setResults(batch.items));

          return;
        }
      } catch (err) {
        if (cancelled || queryRef.current !== query) return;

        console.error("Media fetch failed:", err);

        dispatch(setError(err.message || "Failed to fetch media"));
      }
    };

    getData();

    return () => {
      cancelled = true;
    };
  }, [query, activeTab, dispatch, prefetchBatch]);

  // Show the Top button after scrolling one screen
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadNextPhotoBatch = useCallback(async () => {
    if (
      activeTab !== "photos" ||
      !query ||
      loading ||
      loadingMore ||
      requestLockRef.current
    ) {
      return;
    }

    const requestQuery = query;
    const requestId = ++requestSequenceRef.current;

    requestLockRef.current = true;

    dispatch(setLoadingMore());

    const otherSource =
      nextPhotoSource === "unsplash" ? "wallhaven" : "unsplash";

    const sourcesToTry = [nextPhotoSource, otherSource];

    let lastError = null;

    try {
      for (const source of sourcesToTry) {
        if (
          requestId !== requestSequenceRef.current ||
          queryRef.current !== requestQuery
        ) {
          return;
        }

        const sourceHasMore =
          source === "unsplash" ? hasMoreUnsplash : hasMoreWallhaven;

        if (!sourceHasMore) continue;

        const page = source === "unsplash" ? unsplashPage : wallhavenPage;

        try {
          const batch = await prefetchBatch(source, page, requestQuery);

          if (
            requestId !== requestSequenceRef.current ||
            queryRef.current !== requestQuery
          ) {
            return;
          }

          if (!batch.items.length) {
            dispatch(setPhotoSourceExhausted(source));
            continue;
          }

          dispatch(
            appendPhotoResults({
              results: batch.items,
              source,
              hasMore: batch.hasMore,
            }),
          );

          setPhotoPaginationError("");

          return;
        } catch (err) {
          console.error(`${source} batch failed:`, err);
          lastError = err;
        }
      }

      if (lastError) {
        setPhotoPaginationError(
          lastError.message || "Couldn't load more photos. Please try again.",
        );
      }
    } finally {
      if (requestId === requestSequenceRef.current) {
        requestLockRef.current = false;
      }
    }
  }, [
    activeTab,
    query,
    loading,
    loadingMore,
    nextPhotoSource,
    hasMoreUnsplash,
    hasMoreWallhaven,
    unsplashPage,
    wallhavenPage,
    dispatch,
    prefetchBatch,
  ]);

  const loadNextMediaBatch = useCallback(async () => {
    if (
      !query ||
      activeTab === "photos" ||
      loading ||
      mediaLoadingMore ||
      !hasMoreMedia ||
      requestLockRef.current
    ) {
      return;
    }

    const requestQuery = query;
    const requestTab = activeTab;
    const requestId = ++requestSequenceRef.current;

    requestLockRef.current = true;

    setMediaLoadingMore(true);
    setMediaPaginationError("");

    try {
      const batch =
        requestTab === "videos"
          ? await getVideoBatch(requestQuery, mediaPage)
          : await getGIFBatch(requestQuery, mediaPage);

      if (
        requestId !== requestSequenceRef.current ||
        queryRef.current !== requestQuery
      ) {
        return;
      }

      const existingIds = new Set(results.map((item) => item.id));

      const newItems = batch.items.filter((item) => !existingIds.has(item.id));

      if (newItems.length > 0) {
        dispatch(setResults(removeDuplicates([...results, ...newItems])));
      }

      setHasMoreMedia(batch.hasMore);
      setMediaPage((previousPage) => previousPage + 1);
    } catch (err) {
      if (requestId !== requestSequenceRef.current) return;

      console.error("Loading more media failed:", err);

      setMediaPaginationError(
        err.message || "Couldn't load more results. Please try again.",
      );
    } finally {
      if (requestId === requestSequenceRef.current) {
        requestLockRef.current = false;
        setMediaLoadingMore(false);
      }
    }
  }, [
    query,
    activeTab,
    loading,
    mediaLoadingMore,
    hasMoreMedia,
    mediaPage,
    results,
    dispatch,
  ]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        if (activeTab === "photos") {
          loadNextPhotoBatch();
        } else {
          loadNextMediaBatch();
        }
      },
      {
        root: null,
        rootMargin: "700px",
        threshold: 0,
      },
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [activeTab, loadNextPhotoBatch, loadNextMediaBatch]);

  if (error && results.length === 0) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center text-center">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="mb-4 text-red-400"
        />

        <h2 className="text-lg font-semibold text-white">
          Oops! Something went wrong.
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Our pixels hit a little roadblock. Try again!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center text-center">
        <div className="relative mb-7 h-12 w-12 overflow-hidden rounded-xl border border-violet-400/20 bg-violet-500/5">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.2) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="absolute inset-x-0 h-0.5 animate-scan bg-violet-400 shadow-[0_0_12px_3px_rgba(167,139,250,0.7)]" />
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-white">
          {loadingMessage}
        </h2>

        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-violet-400">
          PLEASE WAIT A SEC...
        </p>
      </div>
    );
  }

  const isLoadingMore = activeTab === "photos" ? loadingMore : mediaLoadingMore;

  const paginationErrorMessage =
    activeTab === "photos" ? photoPaginationError : mediaPaginationError;

  const canLoadMore =
    activeTab === "photos" ? hasMoreUnsplash || hasMoreWallhaven : hasMoreMedia;

  const retryLoading =
    activeTab === "photos" ? loadNextPhotoBatch : loadNextMediaBatch;

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-4 bg-gray-900 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 xl:grid-cols-5">
        {mediaColumns.map((column, columnIndex) => (
          <div
            key={`media-column-${columnIndex}`}
            className="flex min-w-0 flex-col gap-4"
          >
            {column.map((item) => (
              <ResultCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      <div
        ref={sentinelRef}
        className="flex min-h-24 items-center justify-center bg-gray-900 px-4"
      >
        {isLoadingMore && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading more {activeTab === "gif" ? "GIFs" : activeTab}...
          </div>
        )}

        {!isLoadingMore && paginationErrorMessage && (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <p className="text-sm text-red-400">Couldn't load more results.</p>

            <p className="max-w-md text-xs text-gray-500">
              {paginationErrorMessage}
            </p>

            <button
              type="button"
              onClick={retryLoading}
              className="rounded-full border border-white/20 px-4 py-2 text-xs text-white transition hover:bg-white/10"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoadingMore &&
          !paginationErrorMessage &&
          !canLoadMore &&
          results.length > 0 && (
            <p className="py-5 text-sm text-gray-500">
              You've reached the end of the {activeTab}.
            </p>
          )}
      </div>

      {showTopButton && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Back to top"
          className="
      fixed bottom-7 right-7 z-50
      inline-flex items-center gap-2
      rounded-full
      border border-white/20
      bg-white/15
      px-5 py-3
      text-sm font-semibold text-white
      shadow-[0_8px_30px_rgba(0,0,0,0.3)]
      backdrop-blur-xl
      transition-all duration-300
      hover:scale-105 hover:bg-white/25
      active:scale-95
      animate-in fade-in slide-in-from-bottom-3
    "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          Top
        </button>
      )}
    </>
  );
}

export default ResultGride;
