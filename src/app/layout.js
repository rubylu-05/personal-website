'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { metadata } from './metadata';
import { AiFillMail, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarVisible, setSidebarVisible] = useState(pathname === '/');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const messages = {
    '/': "Welcome! Feel free to take a look around :)",
    '/about': "A quick peek into my personal interests and growth as a developer.",
    '/work': "Recent projects that I've poured my curiosity into - they all taught me something new.",
    '/misc': "Sometimes I draw, so here's a casual gallery if you're interested!"
  };

  const currentMessage = messages[pathname] || messages['/'];

  useEffect(() => {
    setSidebarVisible(pathname === '/');
    setDisplayText('');
    setCurrentIndex(0);
  }, [pathname]);

  useEffect(() => {
    if (currentIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentMessage]);

  const handleLinkClick = (e, href) => {
    if (pathname === href) {
      e.preventDefault();
      setSidebarVisible(true);
      router.push('/');
    } else {
      setSidebarVisible(false);
    }
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-black h-screen w-screen overflow-hidden">
        <div className="flex h-full">
          <aside
            className={`transition-all duration-700 ${isSidebarVisible ? 'w-full' : 'w-[30%]'} sidebar-gradient flex justify-center items-center px-6 py-6 relative`}
            style={{
              flexShrink: 0,
            }}
          >
            <div className="text-center relative mb-48">
              <div className="text-5xl font-body font-extrabold text-primary mb-6">Ruby Lu</div>
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
                  Recent Work
                </Link>
                <Link
                  href="/resume"
                  onClick={(e) => handleLinkClick(e, '/resume')}
                  className={`block hover:text-secondary ${pathname === '/resume' ? 'text-secondary' : ''}`}
                >
                  Resume
                </Link>
                <Link
                  href="/misc"
                  onClick={(e) => handleLinkClick(e, '/misc')}
                  className={`block hover:text-secondary ${pathname === '/misc' ? 'text-secondary' : ''}`}
                >
                  Miscellaneous Art
                </Link>
              </nav>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="relative -top-5 mx-auto">
                <div className="bg-white rounded-lg p-4 text-sm text-black whitespace-pre-line text-center min-h-[55px]">
                  {displayText}
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 
      border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white">
                </div>
              </div>

              <Image
                src="/images/me.png"
                alt="me"
                width={150}
                height={150}
                className="mx-auto"
              />
            </div>
          </aside>

          {/* Main content area */}
          <main className={`flex-1 flex justify-center items-start overflow-y-auto p-10 transition-all duration-700 ${isSidebarVisible ? 'translate-x-full' : 'translate-x-0'}`} style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 20%, rgba(244, 235, 227, 1) 100%)',
            flexGrow: 1,
          }}>
            <div className="w-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}