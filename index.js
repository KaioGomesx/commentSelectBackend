require("dotenv").config();
const express = require("express");
const cors = require("cors");

const commentHandle = require("./commentHandle");

const app = express();

app.use(cors());

app.get("/comments", async (req, res) => {
  const { videoId, pageToken } = req.query;

  if (!videoId) {
    res.json({ error: "no video id" }).status(400);
  }

  if (pageToken) {
    const response = await commentHandle(videoId, pageToken);
    res.send(response);
  }

  const response = await commentHandle(videoId);
  res.send(response);
});

app.listen(process.env.PORT, () => console.log(" => alright, server is up"));
