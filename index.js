require("dotenv").config();
const express = require("express");
const cors = require("cors");

const commentHandle = require("./commentHandle");

const app = express();

app.use(cors());

app.get("/comments", async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    res.json({ error: "no video id" }).status(400);
  }

  const response = await commentHandle(videoId);
});

app.listen(process.env.PORT, () => console.log(" => alright, server is up"));
