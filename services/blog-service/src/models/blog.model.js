import mongoose from "mongoose";

const blogSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      content: {
        type: String,
        required: true,
      },

      authorId: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        default: "General",
      },

      tags: [
        {
          type: String,
        },
      ],

      coverImage: {
        type: String,
      },

      status: {
        type: String,
        enum: [
          "draft",
          "published",
        ],
        default: "draft",
      },
    },
    {
      timestamps: true,
    }
  );

blogSchema.index({

  title: "text",

  content: "text",

  tags: "text",

});

const Blog =
  mongoose.model(
    "Blog",
    blogSchema
  );

export default Blog; 