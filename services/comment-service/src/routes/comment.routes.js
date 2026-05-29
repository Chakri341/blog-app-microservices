import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  addComment,
  getBlogComments,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);

router.get("/:blogId", getBlogComments);

router.delete("/:id", authMiddleware, deleteComment);

export default router;
