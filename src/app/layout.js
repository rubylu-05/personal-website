'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { metadata } from './metadata';
import { AiFillMail, AiFillLinkedin, AiFillGithub, AiOutlineMenu } from 'react-icons/ai';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const MESSAGES = {
  '/': "Welcome! Feel free to take a look around :)",
  '/about': "A quick peek into my personal interests and growth as a developer.",
  '/work': "Recent projects that I've poured my curiosity into - they all taught me something new.",
  '/misc': "This is where I get to ramble about art, movies, and music that I like."
};

const MIN_SIDEBAR_WIDTH = 20;
const MAX_SIDEBAR_WIDTH = 60;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef(null);
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('30%');
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const currentMessage = MESSAGES[pathname] || MESSAGES['/'];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

  const resetDialogue = () => {
    setDisplayText('');
    setCurrentIndex(0);
    setShowNowPlaying(false);
    setHasStartedTyping(false);
    
    setTimeout(() => {
      setHasStartedTyping(true);
    }, isMobile ? 100 : 0);
  };

  const startDrag = (e) => {
    if (isMobile) return;
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onDrag = (e) => {
    if (!isDragging || !containerRef.current || isMobile) return;

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

  const handleLinkClick = (e, href) => {
    if (pathname === href) {
      e.preventDefault();
      setSidebarVisible(true);
      router.push('/');
    } else {
      setSidebarVisible(false);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarVisible(pathname === '/');
    }
    resetDialogue();
  }, [pathname, isMobile]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStartedTyping(true);
    }, isMobile ? 10 : 0);

    return () => clearTimeout(startTimer);
  }, [currentMessage, isMobile]);

  useEffect(() => {
    if (!hasStartedTyping) return;

    if (currentIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, isMobile ? 30 : 50);

      return () => clearTimeout(timeout);
    } else if (currentIndex === currentMessage.length && !showNowPlaying) {
      const delay = setTimeout(() => {
        setShowNowPlaying(true);
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [currentIndex, currentMessage, showNowPlaying, hasStartedTyping, isMobile]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <html lang="en" className="light">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-black" style={{ height: '100dvh', width: '100vw', overflow: 'hidden' }} ref={containerRef}>
        <div className="flex h-full">
          {isMobile && pathname !== '/' && (
            <div className="fixed top-4 right-4 z-[1000]" ref={menuRef}>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-light shadow-[0_0_15px_5px_rgba(175,139,106,0.12)]"
                aria-label="Menu"
              >
                <AiOutlineMenu className="text-2xl text-secondary" />
              </button>

              {isMobileMenuOpen && (
                <div className="fixed right-4 top-16 w-48 bg-white rounded-lg py-3 z-[1000] shadow-[0_0_15px_5px_rgba(175,139,106,0.12)]">
                  <div className="flex flex-col items-center space-y-2">
                    <MobileNavLink href="/" pathname={pathname} onClick={(e) => handleLinkClick(e, '/')}>
                      Home
                    </MobileNavLink>
                    <MobileNavLink href="/about" pathname={pathname} onClick={(e) => handleLinkClick(e, '/about')}>
                      About
                    </MobileNavLink>
                    <MobileNavLink href="/work" pathname={pathname} onClick={(e) => handleLinkClick(e, '/work')}>
                      Recent Projects
                    </MobileNavLink>
                    <MobileNavLink href="/misc" pathname={pathname} onClick={(e) => handleLinkClick(e, '/misc')}>
                      Life Outside of Coding
                    </MobileNavLink>
                  </div>

                  <div className="flex justify-center gap-4 px-4 pt-4">
                    <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer" className="text-secondary hover:text-primary hover:scale-105 transition-all">
                      <AiFillMail className="text-lg" />
                    </a>
                    <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary hover:scale-105 transition-all">
                      <AiFillLinkedin className="text-lg" />
                    </a>
                    <a href="https://github.com/ruby-lu-05" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary hover:scale-105 transition-all">
                      <AiFillGithub className="text-lg" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          {(!isMobile || pathname === '/') && (
            <Sidebar
              isVisible={isSidebarVisible}
              width={sidebarWidth}
              isDragging={isDragging}
              pathname={pathname}
              displayText={displayText}
              showNowPlaying={showNowPlaying}
              nowPlaying={nowPlaying}
              onLinkClick={handleLinkClick}
              onAvatarClick={resetDialogue}
              isMobile={isMobile}
              hasStartedTyping={hasStartedTyping}
            />
          )}

          {!isSidebarVisible && !isMobile && (
            <div
              className="w-2 bg-secondary opacity-[20%] hover:opacity-100 hover:bg-primary cursor-col-resize transition-all duration-500 transition-ease-out"
              onMouseDown={startDrag}
              onDoubleClick={() => setSidebarWidth('30%')}
              title="Double-click to reset width"
            />
          )}

          <main className={`flex-1 flex justify-center items-start transition-all duration-700 ${isSidebarVisible && !isMobile ? 'translate-x-full' : 'translate-x-0'} max-h-100 overflow-y-auto
            ${!isMobile ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-light [&::-webkit-scrollbar-thumb]:bg-primary' : ''} relative`}
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

function Sidebar({
  isVisible,
  width,
  isDragging,
  pathname,
  displayText,
  showNowPlaying,
  nowPlaying,
  onLinkClick,
  onAvatarClick,
  isMobile,
  hasStartedTyping
}) {
  return (
    <aside
      className={`${isVisible ? 'w-full' : 'w-[30%]'} sidebar-gradient flex justify-center items-center px-6 py-6 relative ${!isDragging ? 'transition-all duration-300 ease-in-out' : ''
        }`}
      style={{
        flexShrink: 0,
        width: isVisible ? '100%' : isMobile ? '100%' : width
      }}
    >
      <div className="text-center relative mb-48">
        <h1 className="text-5xl font-heading font-extrabold text-primary mb-6">
          Ruby Lu
        </h1>

        <SocialLinks />

        <nav className="text-black text-base font-light font-body space-y-2">
          <NavLink href="/about" pathname={pathname} onClick={(e) => onLinkClick(e, '/about')}>
            About
          </NavLink>
          <NavLink href="/work" pathname={pathname} onClick={(e) => onLinkClick(e, '/work')}>
            Recent Projects
          </NavLink>
          <NavLink href="/misc" pathname={pathname} onClick={(e) => onLinkClick(e, '/misc')}>
            Life Outside of Coding
          </NavLink>
        </nav>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px]">
        {hasStartedTyping && (
          <div className="relative -top-5 mx-auto" style={{ width: "fit-content", maxWidth: "70%" }}>
            <div className="bg-white rounded-lg p-4 text-sm text-black whitespace-pre-line text-center min-h-[55px] font-body font-light">
              {showNowPlaying ? (
                nowPlaying ? (
                  <NowPlayingDisplay nowPlaying={nowPlaying} />
                ) : (
                  <NoTracksDisplay />
                )
              ) : (
                displayText
              )}
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}

        <div>
          <Image
            src={showNowPlaying && nowPlaying?.nowplaying ? "/images/avatar/me-listening.png" : "/images/avatar/me.png"}
            alt="me"
            width={125}
            height={125}
            className="mx-auto h-[15%] object-contain mt-2 hover:scale-[103%] transition-transform duration-200 cursor-pointer"
            onClick={onAvatarClick}
            priority
          />
        </div>
      </div>
    </aside>
  );
}

function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 text-xl mb-6">
      <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer">
        <AiFillMail className="text-secondary hover:text-primary hover:scale-105 text-2xl transition-all duration-100 ease-out" />
      </a>
      <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer">
        <AiFillLinkedin className="text-secondary hover:text-primary hover:scale-105 text-2xl transition-all duration-100 ease-out" />
      </a>
      <a href="https://github.com/ruby-lu-05" target="_blank" rel="noopener noreferrer">
        <AiFillGithub className="text-secondary hover:text-primary hover:scale-105 text-2xl transition-all duration-100 ease-out" />
      </a>
    </div>
  );
}

function NavLink({ href, pathname, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block hover:text-secondary duration-500 ease-out ${pathname === href ? 'text-secondary' : ''
        }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, pathname, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-1 text-sm font-body font-light hover:text-secondary ${pathname === href ? 'text-secondary' : 'text-gray-700'}`}
    >
      {children}
    </Link>
  );
}

function NowPlayingDisplay({ nowPlaying }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <img
          src={nowPlaying.image || '/default-song.png'}
          alt={`${nowPlaying.track} cover`}
          className={`shadow-[0_0_15px_5px_rgba(175,139,106,0.2)] w-12 h-12 rounded-full object-cover ${nowPlaying.nowplaying ? 'animate-spin-slow' : ''
            }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-song.png';
          }}
        />
        <div className="absolute inset-0 m-auto w-3 h-3 bg-white rounded-full shadow-[inset_0_0_15px_5px_rgba(175,139,106,0.2)]"></div>
      </div>
      <div className="text-left overflow-hidden min-w-0">
        <div className="text-xs font-body font-extralight text-bold text-secondary font-light">
          {nowPlaying.nowplaying ? 'Now Listening on Spotify:' : 'Last Played on Spotify:'}
        </div>
        <div className="truncate font-heading font-extrabold -mb-0.5 text-sm" title={nowPlaying.track}>
          {nowPlaying.track}
        </div>
        <div className="truncate font-body font-extralight text-xs" title={nowPlaying.artist}>
          {nowPlaying.artist}
        </div>
      </div>
    </div>
  );
}

function NoTracksDisplay() {
  return (
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
  );
}