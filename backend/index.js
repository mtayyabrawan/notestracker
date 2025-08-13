import "dotenv/config";
import express from "express";

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ resStatus: true, message: "Welcome to Notestracker API" });
});

app.all(/^/, (_, res) => {
  res.status(404).json({ resStatus: false, error: "Route not found" });
});

app.listen(port, () => {
  console.clear();
  console.log({ response: `Server running on http://localhost:${port}` });
});
