'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { metadata } from './metadata';
import { AiFillMail, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light text-black h-screen w-screen">
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="bg-light2 w-[30%] flex justify-center items-center px-6 py-6" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 50%, rgba(175, 139, 106, 0.25) 100%)'
          }}>
            <div className="text-center">
              <div className="text-5xl font-heading text-primary mb-6">Ruby Lu</div>
              <div className="flex justify-center gap-6 text-xl mb-6">
                <a href="mailto:r25lu@uwaterloo.ca" rel="noopener noreferrer">
                  <AiFillMail className="text-secondary hover:text-primary" />
                </a>
                <a href="https://www.linkedin.com/in/ruby-lu/" target="_blank" rel="noopener noreferrer">
                  <AiFillLinkedin className="text-secondary hover:text-primary" />
                </a>
                <a href="https://github.com/ruby-lu-05" target="_blank" rel="noopener noreferrer">
                  <AiFillGithub className="text-secondary hover:text-primary" />
                </a>
              </div>
              <nav className="text-black text-base font-light font-body space-y-2">
                <Link
                  href="/"
                  className={`block hover:text-secondary ${pathname === '/about' ? 'text-secondary' : ''}`}
                >
                  About
                </Link>
                <Link
                  href="/work"
                  className={`block hover:text-secondary ${pathname === '/work' ? 'text-secondary' : ''}`}
                >
                  Recent Work
                </Link>
                <Link
                  href="/resume"
                  className={`block hover:text-secondary ${pathname === '/resume' ? 'text-secondary' : ''}`}
                >
                  Resume
                </Link>
                <Link
                  href="/misc"
                  className={`block hover:text-secondary ${pathname === '/misc' ? 'text-secondary' : ''}`}
                >
                  Miscellaneous Art
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main content area */}
          <main className="flex-1 flex justify-center items-start overflow-y-auto p-10" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 20%, rgba(244, 235, 227, 1) 100%)'
          }}>
            <div className="w-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
