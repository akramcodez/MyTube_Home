import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import logo from '../assets/react.svg';
import { Button } from '../components/Button';
import { useState } from 'react';
import useScreenSize from '../hooks/useScreenSize';

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] =
    useState<boolean>(false);

  const isSmallScreen = useScreenSize(768);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showFullWidthSearch ? (isSmallScreen ? 'hidden' : 'flex') : 'flex'
        }`}
      >
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="h-6" />
        </a>
      </div>
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? 'flex' : 'hidden sm:flex'
        }`}
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
          />
          <Button
            className="py-1.5 px-4 rounded-r-full border border-gray-300 flex-shrink-0 bg-gray-200"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          size="icon"
          className="flex-shrink-0 bg-gray-100"
          variant="ghost"
        >
          <Mic />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 flex ${
          showFullWidthSearch ? (isSmallScreen ? 'hidden' : 'flex') : 'flex'
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
        <Button size="icon" variant="ghost" className="sm:hidden">
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
