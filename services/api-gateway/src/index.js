import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import helmet from "helmet";

import morgan from "morgan";

import rateLimit from
"express-rate-limit";

import {
  authProxy,
  blogProxy,
  commentProxy,
  notificationProxy,
} from "./config/proxy.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

const limiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 100,

  });

app.use(limiter);

app.get("/", (req, res) => {

  res.send(
    "API Gateway Running"
  );

});

// IMPORTANT
app.use(authProxy);

app.use(blogProxy);

app.use(commentProxy);

app.use(notificationProxy);

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {

  console.log(
    `API Gateway running on ${PORT}`
  );

});