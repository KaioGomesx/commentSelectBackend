import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import cors from "cors";

dotenv.config();

import commentHandle from "./commentHandle";

const app: Express = express();

app.use(cors());

app.get("/comments", async (req: Request, res: Response) => {
  const { videoId, pageToken } = req.query as {
    videoId: string;
    pageToken: string;
  };

  if (!videoId) {
    res.json({ error: "no video id" }).status(400);
  }

  if (pageToken) {
    const response = await commentHandle(videoId, pageToken);
    res.json(response).status(200);
  }

  if (!pageToken) {
    const response = await commentHandle(videoId);
    res.json(response).status(200);
  }
});

app.listen(process.env.PORT, () => console.log(" => alright, server is up"));
