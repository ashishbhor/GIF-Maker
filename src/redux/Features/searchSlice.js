
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    loadingMore: false,
    error: null,
    paginationError: null,
    unsplashPage: 1,
    hasMoreUnsplash: true,
    wallhavenPage: 1,
    hasMoreWallhaven: true,
    nextPhotoSource: "unsplash",
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

const searchSlice = createSlice({
    name: "search",
    initialState,

    reducers: {
        setQuery(state, action) {
            state.query = action.payload;

            state.results = [];

            state.loading = false;
            state.loadingMore = false;

            state.error = null;
            state.paginationError = null;

            state.unsplashPage = 1;
            state.hasMoreUnsplash = true;

            state.wallhavenPage = 1;
            state.hasMoreWallhaven = true;

            state.nextPhotoSource = "unsplash";
        },


        setActiveTabs(state, action) {
            state.activeTab = action.payload;
        },


        setResults(state, action) {
            state.results = action.payload;

            state.loading = false;
            state.loadingMore = false;

            state.error = null;
            state.paginationError = null;
        },


        setInitialPhotoResults(state, action) {
            const {
                results,
                hasMore = true,
            } = action.payload;

            state.results = removeDuplicates(results);

            state.unsplashPage = 2;
            state.hasMoreUnsplash = hasMore;

            state.hasMoreWallhaven = true;

            state.nextPhotoSource = "wallhaven";

            state.loading = false;
            state.loadingMore = false;

            state.error = null;
            state.paginationError = null;
        },


        appendPhotoResults(state, action) {
            const {
                results,
                source,
                hasMore = true,
            } = action.payload;

            state.results = removeDuplicates([
                ...state.results,
                ...results,
            ]);

            if (source === "unsplash") {
                state.unsplashPage += 1;
                state.hasMoreUnsplash = hasMore;

                state.nextPhotoSource = "wallhaven";
            }

            if (source === "wallhaven") {
                state.wallhavenPage += 1;
                state.hasMoreWallhaven = hasMore;

                state.nextPhotoSource = "unsplash";
            }

            state.loadingMore = false;
            state.paginationError = null;
        },


        setPhotoSourceExhausted(state, action) {
            const source = action.payload;

            if (source === "unsplash") {
                state.hasMoreUnsplash = false;
                state.nextPhotoSource = "wallhaven";
            }

            if (source === "wallhaven") {
                state.hasMoreWallhaven = false;
                state.nextPhotoSource = "unsplash";
            }

            state.loadingMore = false;
        },



        setLoading(state) {
            state.loading = true;
            state.loadingMore = false;

            state.error = null;
            state.paginationError = null;
        },


        setLoadingMore(state) {
            state.loadingMore = true;
            state.paginationError = null;
        },


        setError(state, action) {
            state.error = action.payload;

            state.loading = false;
            state.loadingMore = false;
        },


        setPaginationError(state, action) {
            state.paginationError = action.payload;
            state.loadingMore = false;
        },


        clearPaginationError(state) {
            state.paginationError = null;
        },


        clearResults(state) {
            state.results = [];

            state.loading = false;
            state.loadingMore = false;

            state.error = null;
            state.paginationError = null;

            state.unsplashPage = 1;
            state.wallhavenPage = 1;

            state.hasMoreUnsplash = true;
            state.hasMoreWallhaven = true;

            state.nextPhotoSource = "unsplash";
        },
    },
});


export const {
    setQuery,
    setActiveTabs,
    setResults,
    setInitialPhotoResults,
    appendPhotoResults,
    setPhotoSourceExhausted,
    setLoading,
    setLoadingMore,
    setError,
    setPaginationError,
    clearPaginationError,
    clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
