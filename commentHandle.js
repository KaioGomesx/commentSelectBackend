const fetch = require("node-fetch");

const commentHandle = async (res, videoId) => {
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
};

module.exports = commentHandle;
