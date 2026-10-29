import { useDispatch, useSelector } from "react-redux";
import { fetchGIF, fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
} from "../redux/Features/searchSlice";
import { useEffect } from "react";
import ResultCard from "./ResultCard";

function ResultGride() {
  const dispatch = useDispatch();
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

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
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
