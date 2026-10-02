// Dev-only (picked up automatically by `npm start`). Mounts the same
// handlers Vercel runs from /api, so local dev needs no extra tooling.
// CRA loads .env into this process, so YOUTUBE_API_KEY stays server-side.
const videos = require('../api/videos');
const suggest = require('../api/suggest');

module.exports = function (app) {
  app.get('/api/videos', videos);
  app.get('/api/suggest', suggest);
};
