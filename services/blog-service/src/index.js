import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from
"./config/db.js";

import connectRedis from
"./config/redis.js";

import connectRabbitMQ,
{
  getChannel,
} from
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

const waitForRabbitMQ =
  async () => {

    while (!getChannel()) {

      console.log(
        "Waiting for RabbitMQ..."
      );

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            2000
          )
      );

    }

  };

const startServer =
  async () => {

    await connectDB();

    await connectRedis();

    connectRabbitMQ();

    await waitForRabbitMQ();

    const PORT =
      process.env.PORT || 8002;

    app.listen(PORT, () => {

      console.log(
        `Blog Service running on ${PORT}`
      );

    });

  };

startServer();