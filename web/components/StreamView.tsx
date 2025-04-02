"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Share2, Loader2, ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { YT_REGEX } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { toast, ToastContainer } from "react-toastify";
import { STREAM_URL } from "@/lib/apiAuthRoute";
import useStreamQueue, { Video } from "@/hooks/state/useStreamQueue";
import useListenStreams from "@/hooks/socketQueries/useListenStreams";
import { useSocketContext } from "@/context/SocketContext";
import YouTubePlayer from "youtube-player";

export default function StreamView({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;
}) {
  const { socket } = useSocketContext();
  const [inputLink, setInputLink] = useState("");
  const { queue, setQueue } = useStreamQueue();
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoader, setPlayNextLoader] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useSession();
  const session: CustomSession | null = data;
  useListenStreams(setCurrentVideo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!session?.user?.token) {
        toast.info("Please try to login first!");
        return;
      }
      const payload = JSON.stringify({
        creatorId: creatorId,
        url: inputLink,
      });

      const res = await fetch(`${STREAM_URL}/createStream`, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": payload.length.toString(),
          Authorization: session?.user?.token || "",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message); // Throw the error to be caught in catch
      }
      toast.success("Creating Stream Success!");
    } catch (error: any) {
      toast.error(`Creating Stream Failed!: ${error.message}`);
      console.log(error.message);
    } finally {
      setLoading(false);
      setInputLink("");
    }
  };

  useEffect(() => {
    if (creatorId && socket) {
      socket.emit("fetch_stream_list", { creatorId: creatorId });
    }
  }, [socket, creatorId]); // Only runs when `socket` is first initialized

  useEffect(() => {
    if (!videoPlayerRef.current) {
      return;
    }
    const player = YouTubePlayer(videoPlayerRef.current);

    // 'loadVideoById' is queued until the player is ready to receive API calls.
    player.loadVideoById(currentVideo?.extractedId || "");

    // 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
    player.playVideo();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function eventHandler(event: any) {
      // console.log(event);
      // console.log(event.data);
      if (event.data === 0) {
        playNext();
      }
    }

    player.on("stateChange", eventHandler);
    return () => {
      player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo, videoPlayerRef]);

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/client/creator/${creatorId}`;
    navigator.clipboard.writeText(shareableLink).then(
      () => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    const payload = queue
      .map((video) =>
        video.id === id
          ? {
              ...video,
              upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
              haveUpvoted: !video.haveUpvoted,
            }
          : video
      )
      .sort((a, b) => b.upvotes - a.upvotes);
    setQueue(payload);

    socket?.emit(`${isUpvote ? "upvote" : "downvote"}`, {
      streamId: id,
      userId: session?.user?.id,
    });
  };

  const playNext = async () => {
    if (queue.length > 0) {
      try {
        setPlayNextLoader(true);
        await fetch(`${STREAM_URL}/next`, {
          method: "GET",
          headers: { Authorization: session?.user?.token || "" },
          credentials: "include",
        });
      } catch (e) {
        console.log(e);
      }
      setPlayNextLoader(false);
    }
  };

  return (
    <div className="from-emerald-950 via-teal-900 to-emerald-800 text-white p-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">
        {/* Upcoming Songs Section */}
        <div className="lg:col-span-2 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Upcoming Songs</h1>
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-900/60 rounded-lg overflow-auto list">
              <div
                className={`flex gap-4 flex-col ${
                  queue.length > 5 ? "h-[820px]" : "h-fit"
                }`}
              >
                {queue.length === 0 && (
                  <Card className="bg-emerald-500 hover:bg-emerald-600 w-full">
                    <CardContent className="p-4">
                      <p className="text-center py-8 text-white">
                        No videos in queue
                      </p>
                    </CardContent>
                  </Card>
                )}

                {queue?.map((video) => (
                  <Card key={video.id} className=" bg-emerald-500">
                    <CardContent className="p-4 grid grid-cols-[220px,auto] space-x-4">
                      {video.smallImg ? (
                        <Image
                          src={video.smallImg}
                          width={210}
                          height={210}
                          alt={`Thumbnail for ${video.title}`}
                          className="object-contain rounded"
                        />
                      ) : (
                        <div className="m-auto">
                          <Loader2 className="text-white animate-spin" />
                        </div>
                      )}
                      <div className="grid grid-cols-[auto,80px]">
                        <h3 className="font-semibold text-white p-2 pr-8">
                          {video.title}
                        </h3>
                        <div
                          className={`my-auto flex items-center justify-center h-1/2 px-3 bg-emerald-800/30 rounded-lg ${
                            video.haveUpvoted && "bg-emerald-900 text-white"
                          }`}
                        >
                          <button
                            onClick={() =>
                              handleVote(
                                video.id,
                                video.haveUpvoted ? false : true
                              )
                            }
                            className="flex gap-2 items-center hover:text-emerald-400"
                          >
                            {video.haveUpvoted ? (
                              <ArrowBigUp className="h-5 w-5" />
                            ) : (
                              <ArrowBigDown className="h-5 w-5" />
                            )}
                            <span>{video.upvotes}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* Add a song section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add a song</h2>
              <Button
                onClick={handleShare}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="text"
                placeholder="Paste YouTube link here"
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)}
                className="bg-emerald-800/50 border-emerald-700 text-white placeholder:text-emerald-300 mb-3"
              />
              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {loading ? "Loading..." : "Add to Queue"}
              </Button>
            </form>
          </div>

          {inputLink && inputLink.match(YT_REGEX) && !loading && (
            <Card className="bg-emerald-500 hover:bg-emerald-600 h-fit">
              <CardContent className="p-4">
                <LiteYouTubeEmbed
                  title=""
                  id={inputLink.split("?v=")[1] || ""}
                />
              </CardContent>
            </Card>
          )}

          {/* Now Playing section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Now Playing</h2>
            <Card className=" bg-emerald-500 hover:bg-emerald-600">
              <CardContent className="p-4">
                {currentVideo ? (
                  <div className="h-fit">
                    {playVideo ? (
                      <>
                        <div ref={videoPlayerRef} className="w-full" />
                        {/* <iframe
                          width={"100%"}
                          height={300}
                          src={`https://www.youtube.com/embed/${currentVideo.extractedId}?autoplay=1`}
                          allow="autoplay"
                        ></iframe> */}
                      </>
                    ) : (
                      <>
                        <Image
                          src={currentVideo.bigImg}
                          alt="bigimage"
                          width={500}
                          height={500}
                          className="w-full h-72 object-cover rounded"
                        />
                        <p className="mt-2 text-center font-semibold text-white">
                          {currentVideo.title}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-center py-8 text-white">
                    No video playing
                  </p>
                )}
              </CardContent>
            </Card>
            {playVideo && (
              <Button
                disabled={playNextLoader}
                onClick={playNext}
                className="w-full  bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Play className="mr-2 h-4 w-4" />{" "}
                {playNextLoader ? "Loading..." : "Play next"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
