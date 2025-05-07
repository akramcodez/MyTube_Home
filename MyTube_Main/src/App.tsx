import { useState } from 'react';
import Categories from './components/Categories';
import PageHeader from './layouts/PageHeader';
import { categories, videos } from './data/home';
import { VideoGridItem } from './components/VedioGridItem';
import { Sidebar } from './layouts/Sidebar';
import { SidebarProvider } from './contexts/SidebarContext';
import useScreenSize from './hooks/useScreenSize';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const isSmallScreen = useScreenSize(768);

  const handleVideoActivate = (videoId: string) => {
    setPlayingVideoId((prev) => (prev === videoId ? null : videoId));
  };

  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col">
        <PageHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div
            className={`flex-1 overflow-x-hidden pb-4 ${
              isSmallScreen ? 'px-2' : 'px-8'
            }`}
          >
            <div className="sticky top-0 bg-white z-10 pb-4">
              <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoGridItem
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  thumbnailGif={video.thumbnailGif}
                  channel={video.channel}
                  views={video.views}
                  postAt={video.postAt}
                  duration={video.duration}
                  videoUrl={video.vedioUrl}
                  isVideoPlaying={playingVideoId === video.id}
                  onVideoActivate={() => handleVideoActivate(video.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
