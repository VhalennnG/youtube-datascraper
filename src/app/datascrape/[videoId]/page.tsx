"use client";
import dynamic from "next/dynamic";

import Description from "@/components/custom/Description";
import Transcript from "@/components/custom/Transcription";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VideoDetails from "@/components/custom/VideoDetail";
import FetchError from "@/components/custom/FetchError";

const NoSSR = dynamic(() => import("@/components/custom/YouTubePlayer"), {
  ssr: false,
});

function transformData(data: any[]) {
  let text = "";

  data.forEach((item) => {
    text += item.text + "\n";
  });

  return {
    data: data,
    text: text.trim(),
  };
}

function transformText(data: any) {
  let text = "";

  if (Array.isArray(data)) {
    data.forEach((item) => {
      text += item.text + "\n";
    });
  } else {
    text = data;
  }

  return {
    data: data,
    text: text.trim(),
  };
}

export default function DataScrapePage() {
  const { videoId } = useParams();
  const [transcript, setTranscript] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const linkId = videoId as string;

  useEffect(() => {
    const id = videoId as string;

    const getData = async () => {
      try {
        const response = await fetch(`/api/datascrape?videoId=${id}`);
        const data = await response.json();

        if (response.ok) {
          const transcriptText = transformData(data.transcript);
          const descriptionText = transformText(data.videoDetails.description);

          setVideoDetails(data.videoDetails);
          setDescription(descriptionText.text);
          setTranscript(transcriptText.text);

          // Set loading to false
          setLoading(false);
          setProgress(95);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setHasError(true);
        setLoading(false);
        setProgress(101);
      }
    };

    if (id) {
      getData();
    }
  }, [videoId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading && progress < 95) {
        setProgress(progress + 1);
      } else if (!loading && progress >= 95 && progress < 101) {
        setProgress(progress + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [loading, progress]);

  if (hasError) {
    return (
      <FetchError message='Video size is too large' error='Overload Size' />
    );
  }

  return (
    <main className='bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900 w-full text-white pt-3'>
      <div className=' pb-16 md:pt-0 pt-2  md:w-5/6 w-11/12 mx-auto'>
        <div className='text-gray-600 body-font'>
          <div className='container mx-auto'>
            <div className='flex flex-col text-center w-full text-white'>
              <h1 className='sm:text-3xl text-2xl font-bold md:mb-10 mb-6 lg:mt-0 mt-5'>
                Data YouTube Video
              </h1>
            </div>
            {progress != 101 ? ( // Render progress bar if loading is true
              <div className='flex flex-col items-center justify-center py-60'>
                <div className='w-1/2 bg-gray-200 rounded-full'>
                  <div
                    className={`h-4 rounded-full ${
                      progress <= 20
                        ? "bg-red-500"
                        : progress <= 40
                        ? "bg-orange-500"
                        : progress <= 60
                        ? "bg-yellow-500"
                        : progress <= 80
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className='mt-2 text-slate-200'>{progress}%</span>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='order-1 md:order-1'>
                  <NoSSR videoId={linkId} />
                </div>
                <div className='order-2 md:order-2'>
                  <VideoDetails
                    title={videoDetails?.title}
                    author={videoDetails?.author}
                    videoId={videoId}
                    views={videoDetails?.viewCount}
                    publishDate={videoDetails?.publishDate}
                    duration={videoDetails?.duration}
                    likes={videoDetails?.likes}
                  />
                </div>
                <div className='order-3 md:order-3'>
                  <Description text={description} />
                </div>
                <div className='order-4 md:order-4'>
                  <Transcript text={transcript} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
