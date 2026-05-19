import express from "express";

import authMiddleware from
  "../middlewares/auth.middleware.js";
import upload from
  "../middlewares/upload.middleware.js";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from
  "../controllers/blog.controller.js";

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("coverImage"),
  createBlog
);

router.get(
  "/",
  getBlogs
);

router.get(
  "/:id",
  getSingleBlog
);

router.put(
  "/:id",
  authMiddleware,
  updateBlog
);

router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);

export default router;