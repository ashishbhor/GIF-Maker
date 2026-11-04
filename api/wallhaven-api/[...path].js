export default async function handler(req, res) {
    // This proxy only supports GET requests.
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");

        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const { path = [] } = req.query;

        const endpoint = Array.isArray(path)
            ? path.join("/")
            : path;

        // Only allow the Wallhaven search endpoint.
        if (endpoint !== "api/v1/search") {
            return res.status(404).json({
                error: "Wallhaven API endpoint not allowed",
            });
        }

        const apiKey = process.env.WALLHAVEN_API_KEY;

        if (!apiKey) {
            console.error("WALLHAVEN_API_KEY is not configured.");

            return res.status(500).json({
                error: "Wallhaven API configuration is missing",
            });
        }

        const targetUrl = new URL(
            "https://wallhaven.cc/api/v1/search"
        );

        // Forward search parameters, but never accept an API key
        // supplied by the browser.
        for (const [key, value] of Object.entries(req.query)) {
            if (key === "path" || key === "apikey") continue;

            if (Array.isArray(value)) {
                value.forEach((item) => {
                    targetUrl.searchParams.append(key, item);
                });
            } else if (value !== undefined) {
                targetUrl.searchParams.set(key, value);
            }
        }

        // Add the API key securely on the server.
        targetUrl.searchParams.set("apikey", apiKey);

        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        const data = await response.text();

        res.status(response.status);
        res.setHeader(
            "Content-Type",
            response.headers.get("content-type") ||
            "application/json"
        );

        return res.send(data);
    } catch (error) {
        console.error("Wallhaven API proxy error:", error);

        return res.status(500).json({
            error: "Unable to fetch Wallhaven data",
        });
    }
}
