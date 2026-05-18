import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import authRoutes from
"./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());

// IMPORTANT
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.get("/", (req, res) => {

  res.send(
    "Auth Service Running"
  );

});

const PORT =
  process.env.PORT || 8001;

app.listen(PORT, () => {

  console.log(
    `Auth Service running on ${PORT}`
  );

});