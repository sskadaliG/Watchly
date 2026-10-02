// Serverless proxy for YouTube search suggestions. Google's suggest endpoint
// sends no CORS headers, so the browser can't call it directly.
// Responds with the same shape Google does: [query, [suggestion, ...]].

const SUGGEST_URL = "https://suggestqueries.google.com/complete/search";
const MAX_QUERY_LENGTH = 100;

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = (req.query.q || "").trim();
  if (!query || query.length > MAX_QUERY_LENGTH) {
    return res.status(400).json({ error: `q must be 1-${MAX_QUERY_LENGTH} characters` });
  }

  const params = new URLSearchParams({ client: "firefox", ds: "yt", q: query });

  try {
    const response = await fetch(`${SUGGEST_URL}?${params}`);
    if (!response.ok) {
      res.setHeader("Cache-Control", "no-store");
      return res.status(502).json({ error: "Suggestions are unavailable right now" });
    }
    const [, suggestions = []] = JSON.parse(await response.text());

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json([query, suggestions]);
  } catch (err) {
    return res.status(502).json({ error: "Failed to reach Google suggestions" });
  }
};
