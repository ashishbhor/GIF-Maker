import { useDispatch, useSelector } from "react-redux";
import { fetchGIF, fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/Features/searchSlice";
import { useEffect } from "react";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import ResultCard from "./ResultCard";

function ResultGride() {
  const dispatch = useDispatch();
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

  const [loadingMessage] = useState(
    () => loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];
        if (activeTab == "photos") {
          let response = await fetchPhotos(query);
          console.log(response.results);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.download,
            dow: item.links.download_location,
          }));
        }
        if (activeTab === "videos") {
          const response = await fetchVideos(query);
          data = response.videos
            .map((item) => {
              const videoFile = item.video_files
                .filter((file) => file.file_type === "video/mp4" && file.link)
                .sort((a, b) => b.width - a.width)[0];
              return {
                id: item.id,
                type: "video",
                title: item.user?.name || "Video",
                thumbnail: item.image,
                src: videoFile?.link || "",
                width: videoFile?.width,
                height: videoFile?.height,
                url: item.video_files[0].link,
                dow: videoFile?.link || "",
              };
            })
            .filter((item) => item.src);
        }
        if (activeTab === "gif") {
          const response = await fetchGIF(query);
          console.log(response.data);
          data = response.data
            .map((item) => ({
              id: item.id,
              type: "gif",
              title: item.title || "GIF",
              thumbnail:
                item.images?.fixed_width_small?.url ||
                item.images?.fixed_width?.url,
              src:
                item.images?.fixed_width?.url ||
                item.images?.original?.url ||
                "",
              url: item.embed_url,
              dow:
                item.images?.original?.url ||
                item.images?.fixed_width?.url ||
                "",
            }))
            .filter((item) => item.src);
        }
        console.log(data);
        dispatch(setResults(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    getData();
  }, [query, activeTab, dispatch]);

  if (error) {
    return (
      <div className="col-span-full flex min-h-[50vh] w-full flex-col items-center justify-center text-center">
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
      <div className="col-span-full flex min-h-[50vh] w-full flex-col items-center justify-center text-center">
        {/* Scanning Animation */}
        <div className="relative mb-7 h-12 w-12 overflow-hidden rounded-xl border border-violet-400/20 bg-violet-500/5">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.2) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="absolute inset-x-0 h-0.5 bg-violet-400 shadow-[0_0_12px_3px_rgba(167,139,250,0.7)] animate-scan" />
        </div>

        {/* Random Headline */}
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {loadingMessage}
        </h2>

        {/* Subheadline */}
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-violet-400">
          PLEASE WAIT A SEC...
        </p>
      </div>
    );
  }
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 px-6 bg-gray-900">
      {results.map((item, idx) => {
        return (
          <div key={idx} className="mb-4 break-inside-avoid">
            <ResultCard item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default ResultGride;
