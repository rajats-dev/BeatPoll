"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronUp,
  ChevronDown,
  Play,
  Volume2,
  Maximize2,
  Settings,
  Pause,
  Share2,
} from "lucide-react";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { YT_REGEX } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { toast, ToastContainer } from "react-toastify";
import { STREAM_URL } from "@/lib/apiAuthRoute";

interface Video {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveUpvoted: boolean;
}

export default function StreamView({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;
}) {
  const [inputLink, setInputLink] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [playNextLoader, setPlayNextLoader] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${STREAM_URL}/createStream`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        creatorId: creatorId,
        url: inputLink,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setQueue([...queue, await res.json()]);
    setLoading(false);
    setInputLink("");
  };

  const handleShare = () => {
    const shareableLink = `${window.location.hostname}/creator/${creatorId}`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-32">
        {/* Upcoming Songs Section */}
        <div className="lg:col-span-2 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Upcoming Songs</h1>
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-900/60 rounded-lg overflow-hidden">
              <div>
                {queue.length === 0 && (
                  <Card className="bg-emerald-500 hover:bg-emerald-600 w-full">
                    <CardContent className="p-4">
                      <p className="text-center py-8 text-white">
                        No videos in queue
                      </p>
                    </CardContent>
                  </Card>
                )}

                {queue.map((video) => (
                  <Card
                    key={video.id}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Image
                        src={video.smallImg}
                        width={500}
                        height={500}
                        alt={`Thumbnail for ${video.title}`}
                        className="w-30 h-20 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            // onClick={() => handleVote(video.id, video.haveUpvoted ? false : true)}
                            className="flex items-center space-x-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                          >
                            {video.haveUpvoted ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                            <span>{video.upvotes}</span>
                          </Button>
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
                // onClick={handleSubmit}
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {loading ? "Loading..." : "Add to Queue"}
              </Button>
            </form>
          </div>

          {inputLink && inputLink.match(YT_REGEX) && !loading && (
            <Card className="bg-emerald-500 hover:bg-emerald-600">
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
                  <div>
                    {playVideo ? (
                      <>
                        <div ref={videoPlayerRef} className="w-full" />
                        {/* <iframe width={"100%"} height={300} src={`https://www.youtube.com/embed/${currentVideo.extractedId}?autoplay=1`} allow="autoplay"></iframe> */}
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
                // onClick={playNext}
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
