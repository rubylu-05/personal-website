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

const scrollToTop = () => {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleLinkClick = (e, href) => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo(0, 0);
    }

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
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        setIsScrolled(mainElement.scrollTop > 50);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--background)] text-[var(--primary)] transition-all" style={{ height: '100dvh', width: '100dvw', overflow: 'hidden' }}>
        <div className="flex flex-col" style={{ height: '100dvh' }}>
          <div className="flex flex-1 overflow-hidden">
            {isMobile && pathname !== '/' && (
              <div className="fixed top-4 right-4 z-[1000]" ref={menuRef}>
                <button
                  onClick={toggleMobileMenu}
                  className="transition-all w-10 h-10 p-2 border border-primary dark:border-darkBackground2 bg-background dark:bg-darkBackground2 rounded-full dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
                  aria-label="Menu"
                >
                  <AiOutlineMenu className="text-2xl text-[var(--primary)]" />
                </button>

                {isMobileMenuOpen && (
                  <div className="fixed right-4 top-16 w-60 bg-background dark:bg-darkBackground2 py-3 z-[1000] border border-primary dark:border-darkBackground2 transition-all rounded-2xl dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col items-center">
                      <MobileNavLink href="/" pathname={pathname} onClick={(e) => handleLinkClick(e, '/')}>Home</MobileNavLink>
                      <MobileNavLink href="/about" pathname={pathname} onClick={(e) => handleLinkClick(e, '/about')}>About</MobileNavLink>
                      <MobileNavLink href="/work" pathname={pathname} onClick={(e) => handleLinkClick(e, '/work')}>Recent Projects</MobileNavLink>
                      <MobileNavLink href="/misc" pathname={pathname} onClick={(e) => handleLinkClick(e, '/misc')}>Life Outside of Coding</MobileNavLink>
                    </div>
                    <div className="flex justify-center gap-4 px-4 pt-4">
                      <a href="mailto:ruby.05.lu@gmail.com" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <MdOutlineMail className="text-lg" />
                      </a>
                      <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <AiOutlineLinkedin className="text-lg" />
                      </a>
                      <a href="https://github.com/rubylu-05" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] transition-all">
                        <FiGithub className="text-lg" />
                      </a>
                      <button
                        onClick={toggleTheme}
                        className="text-[var(--primary)] transition-all"
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                      >
                        {theme === 'light' ? <BsMoon className="text-lg" /> : <BsSun className="text-lg" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isScrolled ? (
              <div className="fixed bottom-4 right-4 z-[1000]">
                <button
                  onClick={scrollToTop}
                  className="
        transition-all 
        w-10 h-10 p-2 
        border border-primary dark:border-darkBackground2 
        bg-background dark:bg-darkBackground2 
        rounded-full 
        dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]
        flex items-center justify-center
        animate-slide-up"
                  aria-label="scroll to top"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--primary)]"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="fixed bottom-4 right-4 z-[1000]">
                <div className="animate-slide-down">
                  <button
                    onClick={scrollToTop}
                    className="
                    transition-all 
                    w-10 h-10 p-2 
                    border border-primary dark:border-darkBackground2 
                    bg-background dark:bg-darkBackground2 
                    rounded-full 
                    dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]
                    flex items-center justify-center"
                    aria-label="scroll to top"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--primary)]"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {(!isMobile || pathname === '/') && (
              <Sidebar
                isVisible={isSidebarVisible}
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

            <main className={`flex-1 transition-all duration-700 ${isSidebarVisible && !isMobile ? 'translate-x-full' : 'translate-x-0'} overflow-y-auto ${!isMobile ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[var(--background)] [&::-webkit-scrollbar-thumb]:bg-[var(--primary)] dark:[&::-webkit-scrollbar-thumb]:bg-darkSecondary' : ''}`}>
              <div className="relative min-h-full">
                {/* Dots pattern background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {!isMobile && (
                    <div
                      className="w-full h-full bg-[length:18px_18px] bg-repeat"
                      style={{
                        backgroundImage: 'radial-gradient(circle, var(--dot-colour, #000) 1px, transparent 1px)',
                      }}
                    />
                  )}
                </div>
                <div id="main-content" className="flex justify-center px-2 md:px-16 py-10 relative z-10">
                  <div className="w-full max-w-4xl 2xl:max-w-5xl transition-all">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

function Sidebar({ isVisible, pathname, displayText, showNowPlaying, nowPlaying, onLinkClick, onAvatarClick, isMobile, onToggleTheme, theme, currentIndex, currentMessage }) {
  const [ellipseVisible, setEllipseVisible] = useState(true);
  const [sparklesVisible, setSparklesVisible] = useState([true, true, true]);

  useEffect(() => {
    let mainInterval;
    let blinkTimeout;

    const animateEllipse = () => {
      setEllipseVisible(false);

      blinkTimeout = setTimeout(() => {
        setSparklesVisible([false, false, false]);

        setTimeout(() => {
          setSparklesVisible([true, true, true]);

          setTimeout(() => {
            setEllipseVisible(true);
          }, 500);
        }, 500);
      }, 1200);
    };

    const initialDelay = 1000 + Math.random() * 2000;
    let initialTimeout = setTimeout(() => {
      animateEllipse();

      mainInterval = setInterval(animateEllipse, 10000);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(mainInterval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  return (
    <aside
      className={`${isVisible ? 'w-full' : 'w-[30%]'} bg-background dark:bg-darkBackground2 outline outline-1 outline-primary dark:outline-darkBackground flex flex-col relative transition-all duration-300 ease-in-out`}
      style={{ flexShrink: 0, width: isVisible ? '100%' : isMobile ? '100%' : '30%', height: '100dvh' }}
    >
      <div className="flex flex-col items-center justify-center h-[50vh] min-h-[300px] relative">
        <div className="absolute top-3 right-4 flex gap-2">
          <div className="relative group">
            <button
              onClick={onToggleTheme}
              className="text-[var(--primary)] md:hover:scale-110 text-xl transition-all"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <BsMoon /> : <BsSun />}
            </button>
            {!isMobile && (
              <>
                {isVisible ? (
                  <div className="absolute flex flex-col items-center right-full -top-0.5 mr-3 bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary dark:border-l-darkBackground"></div>
                  </div>
                ) : (
                  <div className="absolute flex flex-col left-1/2 transform -translate-x-1/2 top-full mt-1 bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    <div className="transition-all absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-primary dark:border-b-darkBackground"></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <svg
            width="300"
            height="140"
            viewBox="0 0 300 140"
            className="w-full max-w-xs"
          >
            <defs>
              <pattern
                id="dotsPattern"
                patternUnits="userSpaceOnUse"
                width="18"
                height="18"
              >
                <circle cx="9" cy="9" r="1" fill="var(--dot-colour)" />
              </pattern>
            </defs>

            <ellipse
              cx="150"
              cy="70"
              rx="160"
              ry="60"
              transform="rotate(6, 160, 60)"
              className="fill-[url(#dotsPattern)]"
              style={{ pointerEvents: 'none' }}
            />

            {/* Main ellipse */}
            <ellipse
              cx="150"
              cy="70"
              rx="140"
              ry="40"
              transform="rotate(-12, 160, 60)"
              className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
              strokeDashoffset="0"
              style={{
                transition: 'stroke-dasharray 1.2s ease-in-out',
                strokeDasharray: ellipseVisible ? '880' : '0, 880',
                filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgb(175, 139, 108))' : 'none',
              }}
            />

            {/* Top, between 'y' and 'L' */}
            <svg
              x="170"
              y="15"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="text-primary dark:text-darkSecondary transition-opacity duration-200"
              style={{
                opacity: sparklesVisible[0] ? 1 : 0,
                filter: theme === 'dark' ? 'drop-shadow(0 0 3px rgb(175, 139, 108))' : 'none'
              }}
            >
              <path
                d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
                className="fill-primary dark:fill-darkSecondary"
              />
            </svg>

            {/* Below 'R' slightly to the left */}
            <svg
              x="55"
              y="100"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="text-primary dark:text-darkSecondary transition-opacity duration-200"
              style={{
                opacity: sparklesVisible[1] ? 1 : 0,
                filter: theme === 'dark' ? 'drop-shadow(0 0 3px rgb(175, 139, 108))' : 'none'
              }}
            >
              <path
                d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
                className="fill-primary dark:fill-darkSecondary"
              />
            </svg>

            {/* Below 'u' bottom right side */}
            <svg
              x="250"
              y="105"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="text-primary dark:text-darkSecondary transition-opacity duration-200"
              style={{
                opacity: sparklesVisible[2] ? 1 : 0,
                filter: theme === 'dark' ? 'drop-shadow(0 0 3px rgb(175, 139, 108))' : 'none'
              }}
            >
              <path
                d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
                className="fill-primary dark:fill-darkSecondary"
              />
            </svg>
            <g
              className={`transition-transform duration-300 ${pathname !== '/' ? 'cursor-pointer hover:scale-100' : ''}`}
              transform="rotate(-3, 150, 70)"
            >
              <text
                x="50%"
                y="60%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-title text-8xl fill-primary dark:fill-darkSecondary"
                style={{
                  fontSize: '6rem',
                  filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgba(230,220,224,0.4))' : 'none'
                }}
                transform="translate(3, 3)"
                onClick={(e) => {
                  if (pathname !== '/') {
                    onLinkClick(e, pathname);
                  }
                }}
              >
                Ruby Lu
              </text>

              {/* Text with stroke */}
              <text
                x="50%"
                y="60%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-title text-8xl fill-none stroke-[3px] stroke-primary dark:stroke-darkSecondary"
                style={{ fontSize: '6rem' }}
                onClick={(e) => {
                  if (pathname !== '/') {
                    onLinkClick(e, pathname);
                  }
                }}
              >
                Ruby Lu
              </text>

              {/* Text fill */}
              <text
                x="50%"
                y="60%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-title text-8xl fill-background2 dark:fill-darkPrimary"
                style={{ fontSize: '6rem' }}
                onClick={(e) => {
                  if (pathname !== '/') {
                    onLinkClick(e, pathname);
                  }
                }}
              >
                Ruby Lu
              </text>
            </g>
          </svg>

          <SocialLinks isMobile={isMobile} />
          <nav className="text-[var(--primary)] text-base font-light font-body mt-4 text-center space-y-1 relative z-30">
            <NavLink href="/about" pathname={pathname} onClick={(e) => onLinkClick(e, '/about')} theme={theme}>About</NavLink>
            <NavLink href="/work" pathname={pathname} onClick={(e) => onLinkClick(e, '/work')} theme={theme}>Recent Projects</NavLink>
            <NavLink href="/misc" pathname={pathname} onClick={(e) => onLinkClick(e, '/misc')} theme={theme}>Life Outside of Coding</NavLink>
          </nav>
        </div>
      </div>

      <div className="h-[50vh] flex flex-col justify-end items-center relative">
        <div className="absolute bottom-2 left-4 text-xs text-[var(--primary)] font-body font-light z-20">
          Built with ♡<br />by
          <span className="font-bold dark:text-darkSecondary tracking-tighter dark:neon-glow"> Ruby Lu</span>
        </div>

        <div className="absolute bottom-3 right-4 flex items-center z-20 group">
          <a
            href="https://cs.uwatering.com/#https://www.rubylu.dev/?nav=prev"
            rel="noopener noreferrer"
            className="text-[var(--primary)] md:hover:scale-110 transition-all flex items-center justify-center w-3 h-3 mr-[-4px]"
            aria-label="Previous"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </a>

          <div className="relative mx-1">
            <a
              href="https://cs.uwatering.com/#https://www.rubylu.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] transition-all"
              aria-label="Webring"
            >
              <img
                src={`/images/webring/${theme === 'light' ? 'black' : 'white'}.png`}
                className="w-5 h-5 md:hover:scale-110 transition-all"
                alt="Webring"
              />
            </a>
            {!isMobile && (
              <div className={`absolute ${isVisible ? 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-3' : 'left-1/2 bottom-full transform -translate-x-1/2 mb-2'} bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-30 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]`}>
                Waterloo CS Webring
                <div className={`absolute ${isVisible ? 'left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary dark:border-l-darkBackground' : 'top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground'}`}></div>
              </div>
            )}
          </div>

          <a
            href="https://cs.uwatering.com/#https://www.rubylu.dev/?nav=next"
            rel="noopener noreferrer"
            className="text-[var(--primary)] md:hover:scale-110 transition-all flex items-center justify-center w-3 h-3 ml-[-8px]"
            aria-label="Next"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>

        <DialogueBox
          displayText={displayText}
          showNowPlaying={showNowPlaying}
          nowPlaying={nowPlaying}
          onAvatarClick={onAvatarClick}
          theme={theme}
          currentIndex={currentIndex}
          currentMessage={currentMessage}
        />
      </div>
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
    <div className="flex justify-center gap-2 text-xl items-center">
      <div className="relative group flex items-center">
        <a href="mailto:ruby.05.lu@gmail.com">
          <MdOutlineMail className="text-[var(--primary)] md:hover:scale-110 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
            <span>Email</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer">
          <AiOutlineLinkedin className="text-[var(--primary)] md:hover:scale-110 text-2xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
            <span>LinkedIn</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground"></div>
          </div>
        )}
      </div>

      <div className="relative group flex items-center">
        <a href="https://github.com/rubylu-05" target="_blank" rel="noopener noreferrer">
          <FiGithub className="text-[var(--primary)] md:hover:scale-110 text-xl transition-all" />
        </a>
        {!isMobile && (
          <div className="absolute flex flex-col -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-background2 dark:bg-darkBackground px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none font-body rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
            <span>GitHub</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavLink({ href, pathname, onClick, children, theme }) {
  const rotations = {
    '/about': 9,
    '/work': -8,
    '/misc': 5
  };
  const rotation = rotations[href] || 0;

  const [isHovered, setIsHovered] = useState(false);
  const [wasActive, setWasActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = pathname === href;

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    let timeout;
    if (isActive) {
      setWasActive(true);
    } else if (wasActive) {
      timeout = setTimeout(() => setWasActive(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [isActive]);

  const showEllipse = (isActive || isHovered || wasActive) && !isMobile;

  return (
    <div className="relative bg-background dark:bg-darkBackground2 transition-all rounded-full px-2">
      {!isMobile && (
        <svg
          width="120"
          height="30"
          viewBox="0 0 120 40"
          className={`absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-[110px] h-[40px] pointer-events-none transition-opacity duration-300 ${showEllipse ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        >
          <ellipse
            cx="60"
            cy="18"
            rx="55"
            ry="12"
            className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
            strokeDashoffset="0"
            style={{
              transition: 'stroke-dasharray 0.5s ease-in-out',
              strokeDasharray: (isActive || isHovered) ? '345' : '0, 345',
              filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgb(175, 139, 108))' : 'none',
            }}
          />
        </svg>
      )}
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`relative block text-lg transition-[font-weight,letter-spacing] duration-500 ${isActive ? 'font-bold tracking-tighter' : ''}`}
      >
        {children}
      </Link>
    </div>
  );
}


function MobileNavLink({ href, pathname, onClick, children }) {
  return (
    <div className="relative py-1">
      <Link
        href={href}
        onClick={onClick}
        className={`relative px-4 py-1 text-base font-body duration-[0.4s] ease-in-out ${pathname === href ? 'dark:text-darkSecondary font-bold tracking-tighter' : 'font-light'
          }`}
      >
        {children}
      </Link>
    </div>
  );
}

function DialogueBox({ displayText, showNowPlaying, nowPlaying, onAvatarClick, theme, currentIndex, currentMessage }) {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [avatarHeight, setAvatarHeight] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const avatarRef = useRef(null);
  const isTyping = currentIndex < currentMessage.length;

  useEffect(() => {
    const updateAvatarSize = () => {
      const viewportHeight = window.innerHeight;
      const maxHeight = Math.min(viewportHeight / 3, 400);
      setAvatarHeight(maxHeight);
    };

    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    updateAvatarSize();
    checkTouchDevice();
    window.addEventListener('resize', updateAvatarSize);
    return () => window.removeEventListener('resize', updateAvatarSize);
  }, []);

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

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[520px] z-10">
      <div className="relative -top-5 mx-auto" style={{ width: "fit-content", maxWidth: "70%" }}>
        <div
          className={`bg-[var(--background)] border border-primary dark:border-darkBackground p-2 px-4 text-[var(--primary)] whitespace-pre-line text-center min-h-[40px] font-body font-light text-base rounded-full dark:shadow-[0_0_15px_rgba(230,220,224,0.1)] ${showNowPlaying ? 'pr-6' : ''}`}
        >
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
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary dark:border-t-darkBackground dark:filter dark:drop-shadow-[0_0_15px_rgba(230,220,224,0.3)]"></div>
      </div>

      <div 
        className="relative mx-auto"
        style={{
          height: `${avatarHeight}px`,
          width: '200px',
          perspective: isTouchDevice ? 'none' : '1000px',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-full h-full transition-transform duration-600 ease-in-out"
          style={{
            transformStyle: isTouchDevice ? 'flat' : 'preserve-3d',
            transform: isTouchDevice ? 'none' : (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'),
          }}
        >
          <div
            className="absolute w-full h-full backface-hidden flex items-center justify-center"
            style={{
              backfaceVisibility: isTouchDevice ? 'visible' : 'hidden',
              WebkitBackfaceVisibility: isTouchDevice ? 'visible' : 'hidden',
              // On touch devices, ensure the front is always visible
              transform: isTouchDevice ? 'none' : undefined,
            }}
          >
            <img
              ref={avatarRef}
              src={getAvatarImage()}
              alt="me"
              style={{
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
                filter: theme === 'dark' ? 'drop-shadow(0 0 15px rgba(230, 220, 224, 0.1))' : 'none',
              }}
              className="object-contain cursor-pointer"
              onClick={handleAvatarClick}
            />
          </div>
          
          <div
            className="absolute w-full h-full backface-hidden flex items-center justify-center"
            style={{
              backfaceVisibility: isTouchDevice ? 'hidden' : 'hidden',
              WebkitBackfaceVisibility: isTouchDevice ? 'hidden' : 'hidden',
              transform: isTouchDevice ? 'none' : 'rotateY(180deg)',
              display: isTouchDevice ? 'none' : 'flex',
            }}
          >
            <img
              src="/images/photos/avatar_photo.png"
              alt="real me"
              style={{
                height: '100%',
                width: 'auto',
                maxWidth: 'none',
                filter: theme === 'dark' ? 'drop-shadow(0 0 15px rgba(230, 220, 224, 0.1))' : 'none',
              }}
              className="object-contain cursor-pointer"
              onClick={handleAvatarClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NowPlayingDisplay({ nowPlaying }) {
  return (
    <div className="flex items-center">
      <div className="relative shrink-0">
        <img
          src={nowPlaying.image || '/default-song.png'}
          alt={`${nowPlaying.track} cover`}
          className={`border border-primary dark:border-darkBackground w-12 h-12 rounded-full object-cover ${nowPlaying.nowplaying ? 'animate-spin-slow' : ''
            }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-song.png';
          }}
        />
        <div className="absolute inset-0 m-auto w-3 h-3 bg-[var(--background)] rounded-full border border-primary dark:border-darkBackground"></div>
      </div>
      <div className="text-left overflow-hidden min-w-0">
        <div className="text-sm font-body font-light text-[var(--primary)] mb-[-3px] pl-4">
          {nowPlaying.nowplaying ? 'Now Listening on Spotify:' : 'Last Played on Spotify:'}
        </div>
        <div className="truncate font-heading font-bold text-primary dark:text-darkSecondary tracking-tighter mt-[-2px] mb-[-2px] dark:neon-glow pl-4" title={nowPlaying.track}>
          {nowPlaying.track}
        </div>
        <div className="truncate font-body font-light text-sm text-[var(--primary)] mt-[-3px] pl-4" title={nowPlaying.artist}>
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
        <div className="text-xs text-[var(--primary)] font-light">No recent tracks found</div>
      </div>
    </div>
  );
}