import dotenv from "dotenv";

import "./jobs/email.worker.js";

dotenv.config();

console.log("Worker Service Running");
