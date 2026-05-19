import express from "express";

import authMiddleware from
  "../middlewares/auth.middleware.js";
import upload from
  "../middlewares/upload.middleware.js";

import roleMiddleware from "../middlewares/role.middleware.js";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllBlogsAdmin
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

router.delete(

  "/admin/:id",

  authMiddleware,

  roleMiddleware("ADMIN"),

  deleteBlog

);

router.get(

  "/admin/all",

  authMiddleware,

  roleMiddleware("ADMIN"),

  getAllBlogsAdmin

);

export default router;