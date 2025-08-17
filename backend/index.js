import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/connectDB.util.js";
import authRouter from "./routes/auth.route.js";
import twoFARouter from "./routes/2fa.route.js";
import notesRouter from "./routes/notes.route.js";

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({ resStatus: true, message: "Welcome to Notestracker API" });
});

app.use("/api/auth/", authRouter);
app.use("/api/2fa/", twoFARouter);
app.use("/api/notes/", notesRouter);

app.all(/^/, (_, res) => {
  res.status(404).json({ resStatus: false, error: "Route not found" });
});

app.listen(port, async () => {
  console.clear();
  await connectDB();
  console.log({
    response: true,
    message: `Server running on http://localhost:${port}`,
  });
});
