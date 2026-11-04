
export default async function handler(req, res) {
    // Support GET for downloads/previews and HEAD for metadata checks.
    if (req.method !== "GET" && req.method !== "HEAD") {
        res.setHeader("Allow", "GET, HEAD");

        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const { path = [] } = req.query;

        const imagePath = Array.isArray(path)
            ? path.join("/")
            : path;

        // Only allow Wallhaven's full-size image directory.
        if (
            !imagePath ||
            !imagePath.startsWith("full/") ||
            imagePath.includes("..") ||
            imagePath.includes("\\") ||
            imagePath.includes("?") ||
            imagePath.includes("#") ||
            imagePath.includes("%")
        ) {
            return res.status(400).json({
                error: "Invalid Wallhaven image path",
            });
        }

        const targetUrl = new URL(
            imagePath
                .split("/")
                .map(encodeURIComponent)
                .join("/"),
            "https://w.wallhaven.cc/"
        );

        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                Referer: "https://wallhaven.cc/",
                Accept: "image/*",
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Unable to retrieve Wallhaven image",
            });
        }

        const contentType =
            response.headers.get("content-type") || "";

        if (!contentType.startsWith("image/")) {
            return res.status(415).json({
                error: "Invalid image response",
            });
        }

        res.setHeader("Content-Type", contentType);
        res.setHeader(
            "Cache-Control",
            "public, max-age=86400, s-maxage=86400"
        );

        const contentLength =
            response.headers.get("content-length");

        if (contentLength) {
            res.setHeader("Content-Length", contentLength);
        }

        if (req.method === "HEAD") {
            return res.status(200).end();
        }

        // Convert the upstream image into a Node.js Buffer.
        const imageBuffer = Buffer.from(
            await response.arrayBuffer()
        );

        return res.status(200).send(imageBuffer);
    } catch (error) {
        console.error("Wallhaven image proxy error:", error);

        return res.status(500).json({
            error: "Unable to process Wallhaven image",
        });
    }
}
