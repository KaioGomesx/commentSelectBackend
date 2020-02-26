const Hermes = require("hermes-http").default;

const hermes = Hermes();

const getVideos = async (url, pageToken = null) => {
  const { data } = await hermes.get(
    `${url}` + (pageToken ? `&pageToken=${pageToken}` : "")
  );

  return {
    nextPageToken: data.nextPageToken,
    comments: data.items.map(item => ({
      commentId: item.id,
      commentAuthor: item.snippet.topLevelComment.snippet.authorDisplayName,
      commentText: item.snippet.topLevelComment.snippet.textOriginal
    }))
  };
};

const commentHandle = async (videoId, pageToken) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;

    if (pageToken) {
      const response = await getVideos(url, pageToken);
      return response;
    }

    const response = await getVideos(url);
    return response;
  } catch (error) {
    console.log(error);
    return { error: "videoId is invalid" };
  }
};

module.exports = commentHandle;
