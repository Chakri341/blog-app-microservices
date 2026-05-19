import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import http from "http";

import connectDB from
"./config/db.js";

import connectRabbitMQ,
{
  getChannel,
} from
"./rabbitmq/connection.js";

import consumeEvents from
"./rabbitmq/consumer.js";

import notificationRoutes from
"./routes/notification.routes.js";

import {
  initSocket,
} from "./socket/socket.js";

dotenv.config();

const app = express();

const server =
  http.createServer(app);

initSocket(server);

app.use(cors());

app.use(express.json());

app.use(
  "/api/notifications",
  notificationRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Notification Service Running"
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

    connectRabbitMQ();

    await waitForRabbitMQ();

    await consumeEvents();

    const PORT =
      process.env.PORT || 8003;

    server.listen(PORT, () => {

      console.log(
        `Notification Service running on ${PORT}`
      );

    });

  };

startServer();