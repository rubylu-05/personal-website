'use client'; // Add this directive to indicate the file is a Client Component

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { metadata } from './metadata'; // Import metadata

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Use the pathname hook

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-light text-black h-screen w-screen">
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-[250px] flex justify-center items-center px-6">
            <div className="border border-gray-400 rounded-xl p-6 w-full h-[80%] flex flex-col justify-center items-center">
              <div className="text-3xl font-bold text-green-900 mb-6">Ruby Lu</div>
              <div className="flex gap-3 text-xl text-[#836f56] mb-6">
                <a href="mailto:r25lu@uwaterloo.ca">✉️</a>
                <a href="#">🌐</a>
                <a href="#">👩‍💻</a>
              </div>
              <nav className="text-black text-lg font-medium space-y-3 text-center">
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
                  Miscellaneous
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main content area */}
          <main className="flex-1 flex justify-center items-center overflow-y-auto p-10">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
