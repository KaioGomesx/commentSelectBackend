require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.get("/comments", async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    res.json({ error: "no video id" }).status(400);
  }

  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
  try {
    const getVideos = pageToken =>
      fetch(
        `${url}` + (pageToken ? `&pageToken=${pageToken}` : "")
      ).then(response => response.json());

    const allComments = [];
    let page = await getVideos();
    allComments.push(...page.items);

    while (page.nextPageToken) {
      page = await getVideos(page.nextPageToken);
      allComments.push(...page.items);
    }

    res.json({ allComments });
  } catch (error) {
    console.log(error);
    res.json({ error: "videoId is invalid" });
  }
});

app.listen(process.env.PORT, () => console.log(" => alright, server is up"));
