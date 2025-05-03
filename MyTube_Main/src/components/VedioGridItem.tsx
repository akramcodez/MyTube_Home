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
  vedioUrl: string;
};

export function VideoGridItem({
  id,
  title,
  thumbnailUrl,
  thumbnailGif,
  channel,
  views,
  postAt,
  duration,
  vedioUrl,
}: VideoProps) {
  return (
    <div className="flex flex-col gap-2">
      <a href={`/watch?v=${id}`} className="relative aspect-video group">
        <img
          src={thumbnailUrl}
          alt={title}
          className="block w-full h-full object-cover rounded-xl"
        />
        <img
          src={thumbnailGif}
          alt={`${title} GIF preview`}
          className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute bottom-1 right-1 bg-black text-white text-sm px-0.5 rounded">
          {duration}
        </div>
      </a>
    </div>
  );
}
