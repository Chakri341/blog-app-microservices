import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import connectRabbitMQ, { getChannel } from "./rabbitmq/connection.js";

import commentRoutes from "./routes/comment.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Comment Service Running");
});

const waitForRabbitMQ = async () => {
  while (!getChannel()) {
    console.log("Waiting for RabbitMQ...");

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

const startServer = async () => {
  await connectDB();

  connectRabbitMQ();

  await waitForRabbitMQ();

  const PORT = process.env.PORT || 8004;

  app.listen(PORT, () => {
    console.log(`Comment Service running on ${PORT}`);
  });
};

startServer();
