import { useSelector } from "react-redux";
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

const CollectionPage = () => {
  const bookmarks = useSelector((state) => state.collection.bookmarks);

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Collection</h1>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center gap-10">
          <p className="text-gray-300 mt-40 ">
            No saved photos or GIFs yet. Bookmark something to see it here!
          </p>
          <Link to="/">
            <img
              src="/public/shopping.png"
              alt="Cart Empty"
              className=" w-60 "
            />
          </Link>
        </div>
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
