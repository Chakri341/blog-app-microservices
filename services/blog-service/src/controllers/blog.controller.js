import Blog from "../models/blog.model.js";

import publishEvent from "../rabbitmq/publisher.js";

import { getRedisClient } from "../config/redis.js";

import cloudinary from "../config/cloudinary.js";

import emailQueue from "../jobs/email.queue.js";

export const createBlog = async (req, res) => {
  try {
    console.log(req.file);

    const { title, content, category, tags, status } = req.body;

    let coverImage = "";

    // UPLOAD TO CLOUDINARY

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog-platform",
      });

      coverImage = result.secure_url;
    }

    const blog = await Blog.create({
      title,

      content,

      coverImage,

      category,

      tags,

      status,

      authorId: req.user.id,
    });

    const redisClient = getRedisClient();

    await redisClient.del("all_blogs");

    await publishEvent(
      "blog_exchange",

      "blog.created",

      {
        blogId: blog._id,

        title: blog.title,

        authorId: blog.authorId,
      },
    );

    await emailQueue.add(
      "send-blog-email",

      {
        email: "admin@blog.com",

        blogTitle: blog.title,
      },

      {
        attempts: 3,

        backoff: {
          type: "exponential",
          delay: 3000,
        },
      },
    );

    res.status(201).json({
      success: true,

      blog,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    // QUERY PARAMS

    const {
      q,
      category,
      status,
      page = 1,
      limit = 10,
      sort = "latest",
    } = req.query;

    // CACHE KEY

    const cacheKey = `blogs:${JSON.stringify(req.query)}`;

    // CHECK CACHE

    const cachedBlogs = await redisClient.get(cacheKey);

    if (cachedBlogs) {
      console.log("Fetching blogs from Redis");

      return res.json(JSON.parse(cachedBlogs));
    }

    console.log("Fetching blogs from MongoDB");

    // FILTER OBJECT

    const filters = {};

    // SEARCH

    if (q) {
      filters.$text = {
        $search: q,
      };
    }

    // CATEGORY

    if (category) {
      filters.category = category;
    }

    // STATUS

    if (status) {
      filters.status = status;
    }

    // SORTING

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    // PAGINATION

    const skip = (page - 1) * limit;

    // DATABASE QUERY

    const blogs = await Blog.find(filters)

      .sort(sortOption)

      .skip(skip)

      .limit(Number(limit));

    // TOTAL COUNT

    const total = await Blog.countDocuments(filters);

    const response = {
      success: true,

      total,

      currentPage: Number(page),

      totalPages: Math.ceil(total / limit),

      blogs,
    };

    // STORE CACHE

    await redisClient.set(
      cacheKey,

      JSON.stringify(response),

      {
        EX: 60,
      },
    );

    res.json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const redisClient = getRedisClient();

    const cacheKey = `blog_${req.params.id}`;

    const cachedBlog = await redisClient.get(cacheKey);

    // CACHE HIT

    if (cachedBlog) {
      console.log("Fetching single blog from Redis");

      return res.json({
        success: true,

        blog: JSON.parse(cachedBlog),
      });
    }

    // CACHE MISS

    console.log("Fetching single blog from MongoDB");

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    await redisClient.set(
      cacheKey,

      JSON.stringify(blog),

      {
        EX: 60,
      },
    );

    res.json({
      success: true,

      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const {
      title,

      content,

      category,

      tags,
    } = req.body;

    // UPDATE DATA

    const updatedData = {
      title,

      content,

      category,

      tags,
    };

    // IMAGE

    if (req.file) {
      updatedData.coverImage = req.file.path;
    }

    // UPDATE BLOG

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,

      updatedData,

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,

      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,

        message: "Blog not found",
      });
    }

    if (blog.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Unauthorized",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    // CLEAR CACHE

    const redisClient = getRedisClient();

    await redisClient.del("all_blogs");

    await redisClient.del(`blog_${req.params.id}`);

    res.json({
      success: true,

      message: "Blog deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,

      blogs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
