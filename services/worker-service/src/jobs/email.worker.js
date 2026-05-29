import { Worker } from "bullmq";

import connection from "./redis.connection.js";

const emailWorker = new Worker(
  "emailQueue",

  async (job) => {
    console.log("Processing Email Job...");

    console.log(job.data);

    // SIMULATE EMAIL SENDING

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Email Sent Successfully");
  },

  {
    connection,
  },
);

emailWorker.on(
  "completed",

  (job) => {
    console.log(`Job ${job.id} completed`);
  },
);

emailWorker.on(
  "failed",

  (job, err) => {
    console.log(`Job ${job.id} failed`);

    console.log(err);
  },
);
