import {
  Clapperboard,
  Home,
  Library,
  Repeat,
  ChevronUp,
  ChevronDown,
  History,
  PlaySquare,
  Clock,
  ListVideo,
  Music2,
  Gamepad2,
  Lightbulb,
  Flame,
  ShoppingBag,
  Film,
  Newspaper,
  Trophy,
  Shirt,
  Radio,
  Podcast,
} from 'lucide-react';
import {
  ElementType,
  ReactNode,
  Children,
  useState,
  useEffect,
  useRef,
} from 'react';
import { buttonVariants, Button } from '../components/Button';
import { cn } from '../lib/util';
import { playLists, subscriptions } from '../data/sideBar';
import { useSideBarContext } from '../contexts/SidebarContext';
import useScreenSize from '../hooks/useScreenSize';

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();
  const isSmallOrMediumScreen = useScreenSize(1024);
  const isSmallScreen = useScreenSize(728);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        isSmallOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSmallOpen, close]);

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-none pb-4 flex flex-col ml-1 ${
          isSmallOrMediumScreen && !isSmallOpen ? 'flex' : 'hidden'
        } ${isLargeOpen ? 'lg:hidden' : 'lg:flex'} ${
          isSmallScreen ? 'hidden' : 'flex'
        }`}
      >
        <SmallSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
        <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          IconOrImgUrl={Clapperboard}
          title="Subs"
          url="/subscriptions"
        />
        <SmallSidebarItem
          IconOrImgUrl={Library}
          title="Library"
          url="/library"
        />
      </aside>
      <aside
        ref={sidebarRef}
        className={`w-64 lg:sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? 'lg:flex' : 'lg:hidden'
        } ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}
      >
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subs"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list"
          />
          {playLists.map((playList) => (
            <LargeSidebarItem
              key={playList.id}
              IconOrImgUrl={ListVideo}
              title={playList.name}
              url={`/playlist?list=${playList.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`https://www.youtube.com/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & Tv"
            url="/movies_tv"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion_beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

interface SmallSidebarItemProps {
  IconOrImgUrl: ElementType;
  title: string;
  url: string;
}

function SmallSidebarItem({ IconOrImgUrl, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'p-5 flex flex-col items-center rounded-lg gap-1',
      )}
    >
      <IconOrImgUrl className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

interface LargeSidebarSectionProps {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIconOrImgUrl = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIconOrImgUrl className="w-6 h-6" />
          <div>{isExpanded ? 'Show less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  );
}

interface LargeSidebarItemProps {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
}

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? 'font-bold bg-gray-100 hover:bg-gray-200' : undefined
        }`,
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" alt="" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
