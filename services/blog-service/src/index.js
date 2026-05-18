import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from
"./config/db.js";

import connectRabbitMQ from
"./rabbitmq/connection.js";

import blogRoutes from
"./routes/blog.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/blogs",
  blogRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Blog Service Running"
  );

});

const startServer =
  async () => {

    await connectDB();

    await connectRabbitMQ();

    const PORT =
      process.env.PORT || 8002;

    app.listen(PORT, () => {

      console.log(
        `Blog Service running on ${PORT}`
      );

    });

  };

startServer();