'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { metadata } from './metadata';
import { AiFillMail, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('30%');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const MIN_SIDEBAR_WIDTH = 20;
  const MAX_SIDEBAR_WIDTH = 60;

  const messages = {
    '/': "Welcome! Feel free to take a look around :)",
    '/about': "A quick peek into my personal interests and growth as a developer.",
    '/work': "Recent projects that I've poured my curiosity into - they all taught me something new.",
    '/misc': "Sometimes I draw, so here's a casual gallery if you're interested!"
  };

  const currentMessage = messages[pathname] || messages['/'];

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('/api/lastfm');
      const data = await response.json();

      if (data?.track?.name) {
        setNowPlaying({
          artist: data.track.artist['#text'] || data.track.artist,
          track: data.track.name,
          album: data.track.album?.['#text'],
          image: data.track.image,
          nowplaying: data.nowplaying
        });
      } else {
        setNowPlaying(null);
      }
    } catch (error) {
      console.error('Error fetching now playing:', error);
      setNowPlaying(null);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSidebarVisible(pathname === '/');
    resetDialogue();
  }, [pathname]);

  const resetDialogue = () => {
    setDisplayText('');
    setCurrentIndex(0);
    setShowNowPlaying(false);
  };

  useEffect(() => {
    if (currentIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else if (currentIndex === currentMessage.length && !showNowPlaying) {
      const delay = setTimeout(() => {
        setShowNowPlaying(true);
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [currentIndex, currentMessage, showNowPlaying]);

  const handleLinkClick = (e, href) => {
    if (pathname === href) {
      e.preventDefault();
      setSidebarVisible(true);
      router.push('/');
    } else {
      setSidebarVisible(false);
    }
  };

  const handleAvatarClick = () => {
    resetDialogue();
  };

  const startDrag = (e) => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onDrag = (e) => {
    if (!isDragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;

    const newWidthPercent = (mouseX / containerWidth) * 100;

    const constrainedWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(newWidthPercent, MAX_SIDEBAR_WIDTH));

    setSidebarWidth(`${constrainedWidth}%`);
  };

  const stopDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
      return () => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDrag);
      };
    }
  }, [isDragging]);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-black h-screen w-screen overflow-hidden" ref={containerRef}>
        <div className="flex h-full">
          <aside
            className={`${isSidebarVisible ? 'w-full' : 'w-[30%]'} sidebar-gradient flex justify-center items-center px-6 py-6 relative ${!isDragging ? 'transition-all duration-700' : ''
              }`}
            style={{
              flexShrink: 0,
              width: isSidebarVisible ? '100%' : sidebarWidth
            }}
          >
            <div className="text-center relative mb-48">
              <div className="text-5xl font-heading font-extrabold text-primary mb-6">Ruby Lu</div>
              <div className="flex justify-center gap-6 text-xl mb-6">
                <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer">
                  <AiFillMail className="text-secondary hover:text-primary text-2xl" />
                </a>
                <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer">
                  <AiFillLinkedin className="text-secondary hover:text-primary text-2xl" />
                </a>
                <a href="https://github.com/ruby-lu-05" target="_blank" rel="noopener noreferrer">
                  <AiFillGithub className="text-secondary hover:text-primary text-2xl" />
                </a>
              </div>
              <nav className="text-black text-base font-light font-body space-y-2">
                <Link
                  href="/about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className={`block hover:text-secondary ${pathname === '/about' ? 'text-secondary' : ''}`}
                >
                  About
                </Link>
                <Link
                  href="/work"
                  onClick={(e) => handleLinkClick(e, '/work')}
                  className={`block hover:text-secondary ${pathname === '/work' ? 'text-secondary' : ''}`}
                >
                  Recent Projects
                </Link>
                <Link
                  href="/misc"
                  onClick={(e) => handleLinkClick(e, '/misc')}
                  className={`block hover:text-secondary ${pathname === '/misc' ? 'text-secondary' : ''}`}
                >
                  Life Outside of Coding
                </Link>
              </nav>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px]">
              <div className="relative -top-5 mx-auto" style={{ width: "fit-content", maxWidth: "70%" }}>
                <div className="bg-white rounded-lg p-4 text-sm text-black whitespace-pre-line text-center min-h-[55px]">
                  {showNowPlaying ? (
                    nowPlaying ? (
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img
                            src={nowPlaying.image || '/default-song.png'}
                            alt={`${nowPlaying.track} cover`}
                            className={`shadow-[0_0_15px_5px_rgba(175,139,106,0.3)] w-12 h-12 rounded-full object-cover ${nowPlaying.nowplaying ? 'animate-spin-slow' : ''}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-song.png';
                            }}
                          />
                          <div className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full shadow-[inset_0_0_15px_5px_rgba(175,139,106,0.3)]"></div>
                        </div>
                        <div className="text-left overflow-hidden min-w-0">
                          <div className="text-xs text-secondary font-light">
                            {nowPlaying.nowplaying ? 'Now Listening on Spotify:' : 'Last Played on Spotify:'}
                          </div>
                          <div className="truncate font-bold -mb-0.5" title={nowPlaying.track}>
                            {nowPlaying.track}
                          </div>
                          <div className="truncate text-xs text-gray-600" title={nowPlaying.artist}>
                            {nowPlaying.artist}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img
                            src="/default-song.png"
                            alt="Not listening"
                            className="h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="text-left overflow-hidden min-w-0">
                          <div className="text-xs text-secondary font-light">Last Played on Spotify:</div>
                          <div className="font-bold -mb-0.5">—</div>
                          <div className="text-xs text-gray-600">[No recent tracks found]</div>
                        </div>
                      </div>
                    )
                  ) : (
                    displayText
                  )}
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 
      border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white">
                </div>
              </div>

              <div>
                <Image
                  src={showNowPlaying && nowPlaying?.nowplaying ? "/images/avatar/me-listening.png" : "/images/avatar/me.png"}
                  alt="me"
                  width={125}
                  height={125}
                  className="mx-auto h-[15%] object-contain mt-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={handleAvatarClick}
                />
              </div>
            </div>
          </aside>

          {/* Draggable divider */}
          {!isSidebarVisible && (
            <div
              className="w-2 bg-[#ebe5e1] hover:bg-primary cursor-col-resize transition-colors duration-200"
              onMouseDown={startDrag}
            />
          )}

          <main
            className={`flex-1 flex justify-center items-start overflow-y-auto p-10 transition-all duration-700 ${isSidebarVisible ? 'translate-x-full' : 'translate-x-0'} max-h-100 overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-light
            [&::-webkit-scrollbar-thumb]:bg-primary
            dark:[&::-webkit-scrollbar-track]:bg-light
            dark:[&::-webkit-scrollbar-thumb]:bg-primary`}
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 20%, rgba(244, 235, 227, 1) 100%)',
              flexGrow: 1,
            }}
          >
            <div className="w-full max-w-screen-xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}