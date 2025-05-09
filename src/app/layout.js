'use client';
import '../styles/globals.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { metadata } from './metadata';
import { AiOutlineLinkedin, AiOutlineMenu } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react"

const MESSAGES = {
  '/': "Welcome! Feel free to take a look around :)",
  '/about': "A quick peek into my personal interests and growth as a developer.",
  '/work': "Recent projects that I've poured my curiosity into - they all taught me something new.",
  '/misc': "A space for the non-technical things that I enjoy and appreciate!"
};

const MIN_SIDEBAR_WIDTH = 20;
const MAX_SIDEBAR_WIDTH = 60;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef(null);
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('30%');
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('light');
  const mainContentRef = useRef(null);

  const currentMessage = MESSAGES[pathname] || MESSAGES['/'];

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;

    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

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

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        return;
      }
  
      if (mainContentRef.current && !isMobile) {
        const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;
        const atTop = scrollTop === 0 && e.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
        
        if (!atTop && !atBottom) {
          e.preventDefault();
          mainContentRef.current.scrollTop += e.deltaY;
        }
      }
    };
  
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isMobile]);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--background)] text-[var(--primary)] transition-all" style={{ height: '100dvh', width: '100dvw', overflow: 'hidden' }} ref={containerRef}>
        <div className="flex" style={{ height: '100dvh' }}>
          {isMobile && pathname !== '/' && (
            <div className="fixed top-4 right-4 z-[1000]" ref={menuRef}>
              <button onClick={toggleMobileMenu} className="transition-all p-2 border border-primary dark:border-darkSecondary bg-background dark:bg-darkBackground2" aria-label="Menu">
                <AiOutlineMenu className="text-2xl text-[var(--primary)]" />
              </button>

              {isMobileMenuOpen && (
                <div className="fixed right-4 top-16 w-60 bg-background dark:bg-darkBackground2 py-3 z-[1000] border border-primary dark:border-darkSecondary transition-all">
                  <div className="flex flex-col items-center space-y-2">
                    <MobileNavLink href="/" pathname={pathname} onClick={(e) => handleLinkClick(e, '/')}>Home</MobileNavLink>
                    <MobileNavLink href="/about" pathname={pathname} onClick={(e) => handleLinkClick(e, '/about')}>About</MobileNavLink>
                    <MobileNavLink href="/work" pathname={pathname} onClick={(e) => handleLinkClick(e, '/work')}>Recent Projects</MobileNavLink>
                    <MobileNavLink href="/misc" pathname={pathname} onClick={(e) => handleLinkClick(e, '/misc')}>Life Outside of Coding</MobileNavLink>
                  </div>
                  <div className="flex justify-center gap-4 px-4 pt-4">
                    <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer" className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 transition-all">
                      <MdOutlineMail className="text-lg" />
                    </a>
                    <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 transition-all">
                      <AiOutlineLinkedin className="text-lg" />
                    </a>
                    <a href="https://github.com/rubylu-05" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 transition-all">
                      <FiGithub className="text-lg" />
                    </a>
                    <button
                      onClick={toggleTheme}
                      className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 transition-all"
                      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                      {theme === 'light' ? <BsMoon className="text-lg" /> : <BsSun className="text-lg" />}
                    </button>
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
              onToggleTheme={toggleTheme}
              theme={theme}
              currentIndex={currentIndex}
              currentMessage={currentMessage}
            />
          )}

          {!isSidebarVisible && !isMobile && (
            <div className="w-1 bg-transparent hover:bg-primary dark:hover:bg-darkSecondary cursor-col-resize transition-all duration-500 transition-ease-out"
              onMouseDown={startDrag}
              onDoubleClick={() => setSidebarWidth('30%')}
              title="Double-click to reset width"
            />
          )}

          <main 
            ref={mainContentRef}
            className={`flex-1 flex justify-center items-start transition-all duration-700 ${isSidebarVisible && !isMobile ? 'translate-x-full' : 'translate-x-0'} overflow-y-auto h-full
              ${!isMobile ? 'transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--background)] [&::-webkit-scrollbar-thumb]:bg-[var(--primary)] dark:[&::-webkit-scrollbar-thumb]:bg-darkSecondary' : ''} relative`}
          >
            <div className="w-full max-w-screen-xl">{children}</div>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

function Sidebar({ isVisible, width, isDragging, pathname, displayText, showNowPlaying, nowPlaying, onLinkClick, onAvatarClick, isMobile, onToggleTheme, theme, currentIndex, currentMessage }) {
  return (
    <aside
      className={`${isVisible ? 'w-full' : 'w-[30%]'} bg-background dark:bg-darkBackground2 outline outline-1 outline-primary dark:outline-darkSecondary flex justify-center items-center px-6 py-6 relative ${!isDragging ? 'transition-all duration-300 ease-in-out' : ''}`}
      style={{ flexShrink: 0, width: isVisible ? '100%' : isMobile ? '100%' : width, height: '100dvh' }}
    >
      <div className="absolute top-4 right-4 group">
        <button
          onClick={onToggleTheme}
          className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 text-xl transition-all"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <BsMoon /> : <BsSun />}
        </button>
        {!isMobile && (
          <>
            {isVisible ? (
              <div className="absolute flex flex-col right-full top-1/2 transform -translate-y-1/2 mr-3 bg-background dark:bg-darkBackground2 p-2 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkSecondary whitespace-nowrap pointer-events-none">
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                <div className="transition-all absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary dark:border-l-darkSecondary"></div>
              </div>
            ) : (
              <div className="absolute flex flex-col left-1/2 transform -translate-x-1/2 top-full mt-2 bg-background dark:bg-darkBackground2 p-2 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkSecondary whitespace-nowrap pointer-events-none">
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                <div className="transition-all absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-primary dark:border-b-darkSecondary"></div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="text-center relative mb-72">
        <h1 className="text-5xl font-heading font-bold text-primary dark:text-darkSecondary mb-6">Ruby Lu</h1>
        <SocialLinks isMobile={isMobile} />
        <nav className="text-[var(--primary)] text-base font-light font-body space-y-2">
          <NavLink href="/about" pathname={pathname} onClick={(e) => onLinkClick(e, '/about')}>About</NavLink>
          <NavLink href="/work" pathname={pathname} onClick={(e) => onLinkClick(e, '/work')}>Recent Projects</NavLink>
          <NavLink href="/misc" pathname={pathname} onClick={(e) => onLinkClick(e, '/misc')}>Life Outside of Coding</NavLink>
        </nav>
      </div>
      <div className="absolute bottom-2 left-4 text-xs text-primary dark:text-darkSecondary font-body font-light z-20">
        <span className="font-bold">Built with ♥</span><br />
        by Ruby Lu
      </div>
      <div className="absolute bottom-2 right-4 text-xs text-primary dark:text-darkSecondary font-body font-light text-right z-20">
        <span className="font-bold">Last updated</span><br />
        5/6/2025
      </div>
      <DialogueBox displayText={displayText} showNowPlaying={showNowPlaying} nowPlaying={nowPlaying} onAvatarClick={onAvatarClick} theme={theme} currentIndex={currentIndex} currentMessage={currentMessage} />
    </aside>
  );
}

function SocialLinks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex justify-center gap-6 text-xl mb-6 items-center">
      <div className="relative group flex items-center">
        <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer">
          <MdOutlineMail className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background dark:bg-darkBackground2 p-2 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkSecondary whitespace-nowrap pointer-events-none">
            <span>Email</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkSecondary"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer">
          <AiOutlineLinkedin className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background dark:bg-darkBackground2 p-2 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkSecondary whitespace-nowrap pointer-events-none">
            <span>LinkedIn</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkSecondary"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://github.com/rubylu-05" target="_blank" rel="noopener noreferrer">
          <FiGithub className="text-[var(--primary)] hover:text-[var(--secondary)] hover:scale-105 text-xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background dark:bg-darkBackground2 p-2 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkSecondary whitespace-nowrap pointer-events-none">
            <span>GitHub</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkSecondary"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLink({ href, pathname, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block hover:text-[var(--secondary)] transition-all ${pathname === href ? 'text-[var(--secondary)]' : ''
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
      className={`px-4 py-1 text-sm font-body font-light hover:text-[var(--secondary)] ${pathname === href ? 'text-[var(--secondary)]' : 'text-[var(--primary)] transition-all'}`}
    >
      {children}
    </Link>
  );
}

function DialogueBox({ displayText, showNowPlaying, nowPlaying, onAvatarClick, theme, currentIndex, currentMessage }) {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const isTyping = currentIndex < currentMessage.length;

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setCurrentAvatar(prev => (prev + 1) % 2);
      }, 200);
      return () => clearInterval(interval);
    } else if (showNowPlaying && nowPlaying?.nowplaying) {
      const interval = setInterval(() => {
        setCurrentAvatar(prev => (prev + 1) % 2);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setCurrentAvatar(0);
    }
  }, [isTyping, showNowPlaying, nowPlaying]);

  const getAvatarImage = () => {
    if (isTyping) {
      return `/images/avatar/${theme}/me-talking${currentAvatar + 1}.png`;
    } else if (showNowPlaying && nowPlaying?.nowplaying) {
      return `/images/avatar/${theme}/me-listening${currentAvatar + 1}.png`;
    }
    return `/images/avatar/${theme}/me.png`;
  };

  const handleAvatarClick = () => {
    onAvatarClick();
  };

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] z-10">
      <div className="relative -top-5 mx-auto" style={{ width: "fit-content", maxWidth: "70%" }}>
        <div className="transition-all bg-[var(--background)] border border-primary dark:border-darkSecondary p-4 text-sm text-[var(--primary)] whitespace-pre-line text-center min-h-[55px] font-body font-light">
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
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary dark:border-t-[var(--secondary)]"></div>
      </div>

      <div>
        <img
          src={getAvatarImage()}
          alt="me"
          className="mx-auto w-[35vw] max-w-[150px] min-w-[80px] sm:max-w-[175px] h-auto object-contain transition-all lg:hover:scale-[103%] cursor-pointer"
          onClick={handleAvatarClick}
        />
      </div>
    </div>
  );
}

function NowPlayingDisplay({ nowPlaying }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <img
          src={nowPlaying.image || '/default-song.png'}
          alt={`${nowPlaying.track} cover`}
          className={`border border-primary dark:border-darkSecondary w-12 h-12 rounded-full object-cover ${nowPlaying.nowplaying ? 'animate-spin-slow' : ''
            }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-song.png';
          }}
        />
        <div className="absolute inset-0 m-auto w-3 h-3 bg-[var(--background)] rounded-full border border-primary dark:border-darkSecondary"></div>
      </div>
      <div className="text-left overflow-hidden min-w-0">
        <div className="text-xs font-body font-light text-bold text-[var(--primary)] font-light">
          {nowPlaying.nowplaying ? 'Now Listening on Spotify:' : 'Last Played on Spotify:'}
        </div>
        <div className="truncate font-heading font-bold text-sm text-[var(--primary)]" title={nowPlaying.track}>
          {nowPlaying.track}
        </div>
        <div className="truncate font-body font-light text-xs text-[var(--primary)]" title={nowPlaying.artist}>
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
        <div className="text-xs text-[var(--primary)] font-light">Last Played on Spotify:</div>
        <div className="font-bold">—</div>
        <div className="text-xs text-[var(--primary)] font-light">[No recent tracks found]</div>
      </div>
    </div>
  );
}