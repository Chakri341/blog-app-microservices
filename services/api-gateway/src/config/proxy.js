import { createProxyMiddleware } from "http-proxy-middleware";

const commonConfig = {
  changeOrigin: true,

  proxyTimeout: 10000,

  timeout: 10000,
};

export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,

  pathFilter: "/api/auth",

  ...commonConfig,
});

export const blogProxy = createProxyMiddleware({
  target: process.env.BLOG_SERVICE_URL,

  pathFilter: "/api/blogs",

  ...commonConfig,

  on: {
    proxyReq: (proxyReq, req) => {
      // IMPORTANT
      if (req.body && Object.keys(req.body).length) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");

        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

        proxyReq.write(bodyData);
      }
    },
  },
});

export const commentProxy = createProxyMiddleware({
  target: process.env.COMMENT_SERVICE_URL,

  pathFilter: "/api/comments",

  ...commonConfig,
});

export const notificationProxy = createProxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL,

  pathFilter: "/api/notifications",

  ...commonConfig,
});
