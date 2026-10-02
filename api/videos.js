// Serverless proxy for the YouTube Data API so the API key never ships to
// the browser. It only serves the one request the app makes: the current
// most popular videos, trimmed to the fields the UI actually renders.

const YOUTUBE_VIDEOS_URL = "https://youtube.googleapis.com/youtube/v3/videos";
const FIELDS = "items(id,snippet(title,channelTitle,thumbnails/medium),statistics/viewCount)";

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.YOUTUBE_API_KEY) {
    return res.status(500).json({ error: "YOUTUBE_API_KEY is not set" });
  }

  const params = new URLSearchParams({
    part: "snippet,statistics",
    chart: "mostPopular",
    maxResults: "50",
    regionCode: "US",
    fields: FIELDS,
    key: process.env.YOUTUBE_API_KEY,
  });

  try {
    const response = await fetch(`${YOUTUBE_VIDEOS_URL}?${params}`);
    const data = await response.json();

    // Let Vercel's CDN cache the list for an hour so most visits use no API
    // quota. Never cache errors, or a bad key would stick for an hour.
    res.setHeader(
      "Cache-Control",
      response.ok ? "s-maxage=3600, stale-while-revalidate=86400" : "no-store"
    );
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Failed to reach YouTube" });
  }
};
