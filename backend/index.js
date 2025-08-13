import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
    console.clear();
  console.log(`Example app listening on port ${port}`);
});
