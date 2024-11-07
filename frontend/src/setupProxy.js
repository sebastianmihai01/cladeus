// Proxy setup for local development to backend
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // Redirects any request starting with /api to the backend server
        createProxyMiddleware({
            target: 'http://localhost:8000', // Django backend server
            changeOrigin: true,
        })
    );
};
