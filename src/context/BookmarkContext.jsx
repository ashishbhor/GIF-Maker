import { createContext, useCallback, useEffect, useState } from "react";

export const BookmarkContext = createContext(null);
const STORAGE_KEY = "gif-maker-bookmarks";

const readBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const isSameItem = (a, b) => a.id === b.id && a.type === b.type;

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(readBookmarks);

  // Keep localStorage synchronized with shared state.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback((item) => {
    setBookmarks((current) => {
      const exists = current.some((saved) => isSameItem(saved, item));

      return exists
        ? current.filter((saved) => !isSameItem(saved, item))
        : [...current, item];
    });
  }, []);

  const isBookmarked = useCallback(
    (item) => bookmarks.some((saved) => isSameItem(saved, item)),
    [bookmarks],
  );

  const removeBookmark = useCallback((item) => {
    setBookmarks((current) =>
      current.filter((saved) => !isSameItem(saved, item)),
    );
  }, []);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
