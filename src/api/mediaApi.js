import axios from "axios";


const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;


export async function fetchPhotos(query, page = 1, per_page = 15) {
    const res = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
            params: { query, page, per_page },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`,
            },
        }
    );

    return res.data;
}



export async function fetchWallhavenPhotos(query, page = 1) {
    const res = await axios.get(
        "/api/wallhaven-api/api/v1/search",
        {
            params: {
                q: query,
                page,
                purity: "100",
            },
        }
    );

    return res.data;
}

// Convert Wallhaven full-image URLs to our backend proxy.
// Other Wallhaven URLs, such as thumbnail hosts, remain unchanged.
function getWallhavenImageUrl(url) {
    if (typeof url !== "string" || !url.trim()) {
        return "";
    }

    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname !== "w.wallhaven.cc") {
            return url;
        }

        return `/api/wallhaven-image${parsedUrl.pathname}${parsedUrl.search}`;
    } catch {
        return url;
    }
}



const uniqueUrls = (urls) => [
    ...new Set(
        urls.filter(
            (url) => typeof url === "string" && url.trim()
        )
    ),
];



export function normalizeUnsplashPhoto(item) {
    const downloadOptions = uniqueUrls([
        item.urls?.raw,
        item.urls?.full,
        item.urls?.regular,
        item.urls?.small,
        item.urls?.thumb,
    ]);

    return {
        id: `unsplash-${item.id}`,
        type: "photo",
        source: "unsplash",
        title: item.alt_description || item.description || "Untitled",
        thumbnail:
            item.urls?.small ||
            item.urls?.thumb ||
            item.urls?.regular ||
            "",
        src: downloadOptions[0] || "",
        downloadOptions,
        width: item.width || null,
        height: item.height || null,
        aspectRatio:
            item.width && item.height
                ? item.width / item.height
                : null,
        url: item.links?.html || "",
        dow: item.links?.download_location || null,
    };
}


export function normalizeWallhavenPhoto(item) {
    const downloadOptions = uniqueUrls([
        item.path,
        item.thumbs?.original,
        item.thumbs?.large,
        item.thumbs?.small,
    ]).map(getWallhavenImageUrl);

    const width = item.dimension_x || null;
    const height = item.dimension_y || null;

    return {
        id: `wallhaven-${item.id}`,
        type: "photo",
        source: "wallhaven",
        title: item.id
            ? `Wallhaven Wallpaper ${item.id}`
            : "Wallpaper",
        thumbnail: getWallhavenImageUrl(
            item.thumbs?.small ||
            item.thumbs?.large ||
            item.path ||
            ""
        ),
        src: downloadOptions[0] || "",
        downloadOptions,
        width,
        height,
        aspectRatio:
            width && height ? width / height : null,
        url: item.url || "",
        dow: null,
    };
}


export const fetchVideos = async (
    query,
    page = 1,
    per_page = 15
) => {
    const res = await axios.get(
        "https://api.pexels.com/videos/search",
        {
            params: {
                query,
                page,
                per_page,
            },
            headers: {
                Authorization: PEXELS_KEY,
            },
        }
    );

    return res.data;
};



export const fetchGIF = async (
    query,
    page = 1,
    per_page = 15
) => {
    const offset = (page - 1) * per_page;

    const res = await axios.get(
        "https://api.giphy.com/v1/gifs/search",
        {
            params: {
                api_key: GIPHY_KEY,
                q: query,
                limit: per_page,
                offset,
            },
        }
    );

    return res.data;
};
