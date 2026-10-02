// Dev-only proxy (picked up automatically by react-scripts).
// Google's suggest endpoint sends no CORS headers, so the browser
// can't call it directly; /api/suggest?q=... is forwarded here instead.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/suggest',
    createProxyMiddleware({
      target: 'https://suggestqueries.google.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/suggest\\?': '/complete/search?client=firefox&ds=yt&',
      },
    }),
  );
};
