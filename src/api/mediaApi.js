import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY

const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY

const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY

export async function fetchPhotos (query,page=1,per_page=20)  {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, page, per_page },
        headers:{Authorization:`Client-ID ${UNSPLASH_KEY}`}
    })
    return res.data;
}

export async function fetchWallhavenPhotos(query,page=1) {
    const res = await axios.get('https://wallhaven.cc/api/v1/search', {
        params: {  q: query,page,purity: "100"},
    })
    return res.data;
}

export function normalizeUnsplashPhoto(item) {
  return {
    id: `unsplash-${item.id}`,
    type: "photo",
    source: "unsplash",
    title: item.alt_description || item.description || "Untitled",
    thumbnail: item.urls?.small || item.urls?.thumb || "",
    src: item.urls?.full || item.urls?.regular || item.urls?.raw || "",
    url: item.links?.html || "",
    dow: item.links?.download_location || null,
  };
}

export function normalizeWallhavenPhoto(item) {
  return {
    id: `wallhaven-${item.id}`,
    type: "photo",
    source: "wallhaven",
    title: item.id ? `Wallhaven Wallpaper ${item.id}` : "Wallpaper",
    thumbnail: item.thumbs?.small || item.thumbs?.original || item.path || "",
    src: item.path || "",
    url: item.url || "",
    dow: null,
  };
}

export const fetchVideos = async (query,per_page=15) => {
    const res = await axios.get('https://api.pexels.com/videos/search', {
        params: { query, per_page },
        headers:{Authorization:PEXELS_KEY}
    })
    return res.data
}
export const fetchGIF = async (query,page=1,per_page=15) => {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            api_key: GIPHY_KEY,
            q: query ,
            limit: per_page,
            offset: (page - 1) * per_page,
        },
    })
    return res.data
}