import Comment from "../models/comment.model.js";

import publishEvent from "../rabbitmq/publisher.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, content, parentComment } = req.body;

    const comment = await Comment.create({
      blogId,

      content,

      parentComment: parentComment || null,

      userId: req.user.id,
    });

    await publishEvent(
      "comment_exchange",

      "comment.created",

      {
        commentId: comment._id,

        blogId: comment.blogId,

        userId: comment.userId,
      },
    );

    res.status(201).json({
      success: true,

      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blogId: req.params.blogId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,

      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,

        message: "Comment not found",
      });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Unauthorized",
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,

      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
