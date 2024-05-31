import { TbListDetails } from "react-icons/tb";

interface TranscriptProps {
  title: string;
  author: string;
  videoId: any;
  views: string;
  publishDate: string;
  duration: number;
  likes: string;
}

function formatDuration(seconds: number) {
  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${
      minutes > 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
  } else {
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days} day${days > 1 ? "s" : ""} ${remainingHours} hour${
      remainingHours > 1 ? "s" : ""
    } ${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
  }
}

export default function VideoDetails({
  title,
  author,
  videoId,
  views,
  publishDate,
  duration,
  likes,
}: Readonly<TranscriptProps>) {
  const formattedViews = Number(views).toLocaleString("de-De");

  const likesNumberMatch = likes ? likes.match(/[\d.]+/g) : null;
  const likesNumber = likesNumberMatch
    ? Number(likesNumberMatch[0].replace(/\./g, ""))
    : 0;

  const formattedLikes = likesNumber.toLocaleString("de-DE");
  const durationVideo = formatDuration(duration);

  return (
    <div className='flex rounded-lg bg-gradient-to-t from-slate-800 to-neutral-900 p-8 flex-col '>
      <div className='flex items-center mb-3'>
        <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-rose-900 text-white flex-shrink-0'>
          <TbListDetails />
        </div>
        <h2 className='text-slate-50 text-lg font-bold'>Video Details</h2>
      </div>
      <div className='mt-4 flex flex-col gap-1 w-full text-slate-50 md:min-h-[220px]'>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Title : </span>
          {title}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Author : </span>
          {author}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Video ID : </span>
          {videoId}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Total Views : </span>
          {formattedViews}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Publish Date : </span>
          {publishDate}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Duration : </span>
          {durationVideo}
        </div>
        <div className='md:text-base text-sm'>
          <span className='font-semibold'>Total Likes : </span>
          {formattedLikes}
        </div>
      </div>
    </div>
  );
}
