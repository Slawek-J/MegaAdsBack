import express from "express";
import cors from "cors";
import "express-async-errors";
import { handleError, ValidationError } from "./utils/errors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on http://localhost:3001");
});
