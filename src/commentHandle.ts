import Hermes from "hermes-http";

const hermes = Hermes();

type Comment = {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorProfileImageUrl: string;
        authorDisplayName: string;
        textOriginal: string;
      };
    };
  };
};

type apiResponse = {
  nextPageToken: string;
  items: Array<any>;
};

const getVideos = async (url: string, pageToken: string | null = null) => {
  const { data } = await hermes.get<apiResponse>(
    `${url}` + (pageToken ? `&pageToken=${pageToken}` : "")
  );

  return {
    nextPageToken: data.nextPageToken,
    comments: data.items.map((item: Comment) => ({
      commentId: item.id,
      commentAuthorProfileImageUrl:
        item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      commentAuthor: item.snippet.topLevelComment.snippet.authorDisplayName,
      commentText: item.snippet.topLevelComment.snippet.textOriginal
    }))
  };
};

const commentHandle = async (
  videoId: string,
  pageToken: string | null = null
) => {
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

export default commentHandle;
