import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { useState, useRef, useEffect } from 'react';

type Categories = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TANSLATE_AMOUT = 200;

export function Categories({
  categories,
  selectedCategory,
  onSelect,
}: Categories) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [translate, setTranlate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth,
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? 'dark' : 'default'}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white to-transparent w-24 h-full">
          <Button
            onClick={() => {
              setTranlate((translate) => {
                const newTraslate = translate - TANSLATE_AMOUT;
                if (newTraslate <= 0) return 0;
                return newTraslate;
              });
            }}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-24 h-full flex justify-end">
          <Button
            onClick={() => {
              setTranlate((translate) => {
                if (containerRef.current == null) return translate;
                const newTraslate = translate + TANSLATE_AMOUT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTraslate + width >= edge) return edge - width;
                return newTraslate;
              });
            }}
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
