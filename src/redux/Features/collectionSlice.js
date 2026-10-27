
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "gif-maker-bookmarks";

const loadBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const isSameItem = (a, b) =>
  a.id === b.id && a.type === b.type;

const collectionSlice = createSlice({
  name: "collection",

  initialState: {
    bookmarks: loadBookmarks(),
  },

  reducers: {
    toggleBookmark: (state, action) => {
      const item = action.payload;

      const exists = state.bookmarks.some((savedItem) =>
        isSameItem(savedItem, item),
      );

      if (exists) {
        state.bookmarks = state.bookmarks.filter(
          (savedItem) => !isSameItem(savedItem, item),
        );
      } else {
        state.bookmarks.push(item);
      }
    },

    removeBookmark: (state, action) => {
      const item = action.payload;

      state.bookmarks = state.bookmarks.filter(
        (savedItem) => !isSameItem(savedItem, item),
      );
    },

    clearCollection: (state) => {
      state.bookmarks = [];
    },
  },
});

export const {
  toggleBookmark,
  removeBookmark,
  clearCollection,
} = collectionSlice.actions;

export default collectionSlice.reducer;
