import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './Features/searchSlice';
import collectionReducer from './Features/collectionSlice'

const collectionPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("collection/")) {
    try {
      const bookmarks = store.getState().collection.bookmarks;

      localStorage.setItem(
        "gif-maker-bookmarks",
        JSON.stringify(bookmarks),
      );
    } catch (error) {
      console.error("Failed to save collection:", error);
    }
  }

  return result;
};

export const store = configureStore({
    reducer: {
        search: searchReducer,
        collection: collectionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(collectionPersistenceMiddleware),
});

export default store;