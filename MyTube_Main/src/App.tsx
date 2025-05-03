import Categories from './components/Categories';
import PageHeader from './layouts/PageHeader';
import { categories, videos } from './data/home';
import { useState } from 'react';
import { VideoGridItem } from './components/VedioGridItem';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="h-screen flex flex-col">
      <PageHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="overflow-y-auto">sidebar</div>
        <div className="flex-1 overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {videos.map((video) => (
              <VideoGridItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
