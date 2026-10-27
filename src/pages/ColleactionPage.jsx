import { useSelector } from "react-redux";
import ResultCard from "../components/ResultCard";

const CollectionPage = () => {
  const bookmarks = useSelector((state) => state.collection.bookmarks);

  return (
    <div className="min-h-screen bg-white px-6 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Collection</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">
          No saved photos or GIFs yet. Bookmark something to see it here!
        </p>
      ) : (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
          {bookmarks.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="mb-4 inline-block w-full break-inside-avoid"
            >
              <ResultCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
