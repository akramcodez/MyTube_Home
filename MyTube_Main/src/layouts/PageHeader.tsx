import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import logo from '../assets/logo.png';
import { Button } from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import useScreenSize from '../hooks/useScreenSize';
import { useSideBarContext } from '../contexts/SidebarContext';

interface PageHeaderProps {
  setSearchQuery?: (query: string) => void;
}

export default function PageHeader({ setSearchQuery }: PageHeaderProps) {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [searchQuery, setLocalQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const isSmallScreen = useScreenSize(768);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (isSmallScreen && isListening) {
      setShowFullWidthSearch(true);
    } else if (isSmallScreen && showFullWidthSearch) {
      setShowFullWidthSearch(true);
    } else {
      setShowFullWidthSearch(false);
    }
  }, [isSmallScreen, isListening, showFullWidthSearch]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setLocalQuery(transcript);
      setSearchQuery?.(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      const errorMessages: { [key: string]: string } = {
        'no-speech': 'No speech detected. Please try again.',
        'audio-capture': 'Microphone not detected. Please check your device.',
        'not-allowed':
          'Microphone access denied. Please allow microphone access.',
        network: 'Network error. Please check your connection.',
      };
      alert(
        errorMessages[event.error] ||
          'Speech recognition error. Please try again.',
      );
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [setSearchQuery]);

  const handleMicClick = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        if (isSmallScreen) {
          setShowFullWidthSearch(true);
        }
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        alert('Failed to start microphone. Please try again.');
        setIsListening(false);
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    if (setSearchQuery) {
      setSearchQuery(trimmed);
    } else {
      const encodedQuery = encodeURIComponent(trimmed).replace(/%20/g, '+');
      window.location.href = `https://www.youtube.com/results?search_query=${encodedQuery}`;
    }

    setShowFullWidthSearch(false);
  };

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderTopSection
        showFullWidthSearch={showFullWidthSearch}
        isSmallScreen={isSmallScreen}
      />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? 'flex' : 'hidden sm:flex'
        }`}
        onSubmit={handleSearch}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            className="flex-shrink-0 bg-gray-100"
            variant="ghost"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex items-center w-full max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-gray-300 shadow-inner py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            aria-label="Search MyTube videos"
          />
          <Button
            type="submit"
            className="py-1.5 px-4 rounded-r-full border border-gray-300 flex-shrink-0 bg-gray-200"
          >
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          size="icon"
          className={`flex-shrink-0 ${
            isListening ? 'bg-red-100' : 'bg-gray-100'
          }`}
          variant="ghost"
          onClick={handleMicClick}
          aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
        >
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 flex ${
          showFullWidthSearch && isSmallScreen ? 'hidden' : 'flex'
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="sm:hidden"
        >
          <Search />
        </Button>
        <Button
          type="button"
          size="icon"
          className={`flex-shrink-0 ${
            isListening ? 'bg-red-100' : 'bg-gray-100'
          } sm:hidden`}
          variant="ghost"
          onClick={handleMicClick}
          aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
        >
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderTopSectionProps = {
  showFullWidthSearch?: boolean;
  isSmallScreen: boolean;
};

export function PageHeaderTopSection({
  showFullWidthSearch = false,
  isSmallScreen,
}: PageHeaderTopSectionProps) {
  const { toggle } = useSideBarContext();
  return (
    <div
      className={`gap-2.5 items-center flex-shrink-0 ${
        showFullWidthSearch && isSmallScreen ? 'hidden' : 'flex'
      }`}
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/" className="flex gap-1.5">
        <img src={logo} className="h-8" alt="MyTube logo" />
        <p
          style={{
            color: '#000',
            fontSize: '1.4rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          MyTube
        </p>
      </a>
    </div>
  );
}
