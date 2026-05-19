import Blog from
"../models/blog.model.js";

import publishEvent from
"../rabbitmq/publisher.js";

import {
  getRedisClient,
} from
"../config/redis.js";

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

      // CLEAR CACHE

      const redisClient =
        getRedisClient();

      await redisClient.del(
        "all_blogs"
      );

      // PUBLISH EVENT

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

      const redisClient =
        getRedisClient();

      const cachedBlogs =
        await redisClient.get(
          "all_blogs"
        );

      // CACHE HIT

      if (cachedBlogs) {

        console.log(
          "Fetching blogs from Redis"
        );

        return res.json({

          success: true,

          blogs:
            JSON.parse(
              cachedBlogs
            ),

        });

      }

      // CACHE MISS

      console.log(
        "Fetching blogs from MongoDB"
      );

      const blogs =
        await Blog.find()
          .sort({
            createdAt: -1,
          });

      await redisClient.set(

        "all_blogs",

        JSON.stringify(blogs),

        {
          EX: 60,
        }

      );

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

      const redisClient =
        getRedisClient();

      const cacheKey =
        `blog_${req.params.id}`;

      const cachedBlog =
        await redisClient.get(
          cacheKey
        );

      // CACHE HIT

      if (cachedBlog) {

        console.log(
          "Fetching single blog from Redis"
        );

        return res.json({

          success: true,

          blog:
            JSON.parse(
              cachedBlog
            ),

        });

      }

      // CACHE MISS

      console.log(
        "Fetching single blog from MongoDB"
      );

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

      await redisClient.set(

        cacheKey,

        JSON.stringify(blog),

        {
          EX: 60,
        }

      );

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

      // CLEAR CACHE

      const redisClient =
        getRedisClient();

      await redisClient.del(
        "all_blogs"
      );

      await redisClient.del(
        `blog_${req.params.id}`
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

      // CLEAR CACHE

      const redisClient =
        getRedisClient();

      await redisClient.del(
        "all_blogs"
      );

      await redisClient.del(
        `blog_${req.params.id}`
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