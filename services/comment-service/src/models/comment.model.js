import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Comment",

      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
