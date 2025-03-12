import { z } from "zod";
import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import youtubesearchapi from "youtube-search-api";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;

const MAX_QUEUE_LEN = 20;

class StreamController {
  static async createStream(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("1--", data);
      const parseData = CreateStreamSchema.parse(data);
      console.log("2---", parseData);
      const isYt = parseData.url.match(YT_REGEX);
      if (!isYt) {
        return res.status(411).json({ message: "Wrong Url Format" });
      }
      const extractedId = parseData.url.split("?v=")[1];

      const ytbRes = await youtubesearchapi.GetVideoDetails(extractedId);

      const thumbnails = ytbRes.thumbnail.thumbnails;
      thumbnails.sort((a: { width: number }, b: { width: number }) =>
        a.width < b.width ? -1 : 1
      );

      const existingActiveStream = await prisma.stream.count({
        where: {
          userId: parseData.creatorId,
        },
      });

      if (existingActiveStream && existingActiveStream > MAX_QUEUE_LEN) {
        return res.status(411).json({ message: "Already at limit" });
      }

      const stream = await prisma.stream.create({
        data: {
          userId: parseData.creatorId,
          url: parseData.url,
          extractedId,
          type: "Youtube",
          title: ytbRes.title ?? "Can find video",
          smallImg:
            (thumbnails.length > 1
              ? thumbnails[thumbnails.length - 2].url
              : thumbnails[thumbnails.length - 1].url) ??
            "https://us.123rf.com/450wm/fokaspokas/fokaspokas1901/fokaspokas190100268/115137255-associez-des-photos-des-fichiers-image-un-album-d-images-une-simple-ic%C3%B4ne-ic%C3%B4ne-noire-sur-fond.jpg",
          bigImg:
            thumbnails[thumbnails.length - 1].url ??
            "https://us.123rf.com/450wm/fokaspokas/fokaspokas1901/fokaspokas190100268/115137255-associez-des-photos-des-fichiers-image-un-album-d-images-une-simple-ic%C3%B4ne-ic%C3%B4ne-noire-sur-fond.jpg",
        },
      });
      return res.status(200).json({ ...stream, hasUpvoted: false, upvotes: 0 });
    } catch (error) {
      console.log(error);
      return res.status(411).json({ message: "Error while adding Stream!" });
    }
  }

  static async getStream(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;
      const streams = await prisma.stream.findMany({
        where: {
          userId: creatorId,
        },
      });
      return res.status(200).json({ streams });
    } catch (error) {
      console.log(error);
      return res.status(411).json({ message: "Error while adding Stream!" });
    }
  }
}

export default StreamController;
