import { useState } from 'react';
import {
  formatDuration,
  timeToSeconds,
  viewstoNum,
  formatTimeAgo,
} from '../utils/format';

type VideoProps = {
  id: string;
  title: string;
  thumbnailUrl: string;
  thumbnailGif: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: string;
  postAt: Date;
  duration: string;
  videoUrl: string;
  isVideoPlaying: boolean;
  onVideoActivate: () => void;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  compactDisplay: 'short',
});

export function VideoGridItem({
  id,
  title,
  thumbnailUrl,
  thumbnailGif,
  channel,
  views,
  postAt,
  duration,
  videoUrl,
  isVideoPlaying,
  onVideoActivate,
}: VideoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const videoId = videoUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/,
  )?.[1];

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isVideoPlaying) {
          onVideoActivate();
        }
      }}
    >
      <a
        href={`/watch?v=${id}`}
        className="relative aspect-video group"
        onClick={(e) => {
          e.preventDefault();
          onVideoActivate();
        }}
      >
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-all duration-200 ${
            isVideoPlaying ? 'rounded-none' : 'rounded-xl'
          }`}
        />
        {isHovered && !isVideoPlaying && (
          <img
            src={thumbnailGif}
            className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-100 transition-opacity duration-300"
          />
        )}
        <div className="absolute bottom-1 right-1 bg-black text-white text-sm px-0.5 rounded">
          {formatDuration(timeToSeconds(duration))}
        </div>
        {isVideoPlaying && videoId && isHovered && (
          <a href={`/watch?v=${id}`}>
            <iframe
              className="block h-full w-full absolute inset-0"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </a>
        )}
      </a>
      <div className="flex gap-2">
        <a
          href={`https://www.youtube.com/@${channel.id}`}
          className="flex-shrink-0"
        >
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href="/" className="font-bold text-sm">
            {title}
          </a>
          <a href="/" className="text-gray-600 text-sm">
            {channel.name}
          </a>
          <div className="text-gray-500 text-sm">
            {`${VIEW_FORMATTER.format(
              viewstoNum(views),
            )} Views • ${formatTimeAgo(postAt)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
