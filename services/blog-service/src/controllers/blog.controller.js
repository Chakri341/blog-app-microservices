import Blog from
"../models/blog.model.js";

import publishEvent from
"../rabbitmq/publisher.js";

export const createBlog =
  async (req, res) => {

    try {

      const {
        title,
        content,
        category,
        tags,
        status,
      } = req.body;

      const blog =
        await Blog.create({

          title,

          content,

          category,

          tags,

          status,

          authorId:
            req.user.id,

        });

      await publishEvent(

        "blog_exchange",

        "blog.created",

        {
          blogId: blog._id,

          title: blog.title,

          authorId:
            blog.authorId,
        }

      );

      res.status(201).json({

        success: true,

        blog,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getBlogs =
  async (req, res) => {

    try {

      const blogs =
        await Blog.find()
          .sort({
            createdAt: -1,
          });

      res.json({

        success: true,

        blogs,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const getSingleBlog =
  async (req, res) => {

    try {

      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {

        return res.status(404).json({

          success: false,

          message:
            "Blog not found",

        });

      }

      res.json({

        success: true,

        blog,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const updateBlog =
  async (req, res) => {

    try {

      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {

        return res.status(404).json({

          success: false,

          message:
            "Blog not found",

        });

      }

      if (
        blog.authorId !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      const updatedBlog =
        await Blog.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.json({

        success: true,

        updatedBlog,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const deleteBlog =
  async (req, res) => {

    try {

      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {

        return res.status(404).json({

          success: false,

          message:
            "Blog not found",

        });

      }

      if (
        blog.authorId !==
        req.user.id
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      await Blog.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "Blog deleted",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };