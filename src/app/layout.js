import '../styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Ruby Lu',
  description: 'Personal Website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fdfaf8] text-black h-screen w-screen">
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-[250px] flex justify-center items-center px-6">
            <div className="border border-gray-400 rounded-xl p-6 w-full h-[80%] flex flex-col justify-center items-center">
              <div className="text-3xl font-bold text-green-900 mb-6">Ruby Lu</div>
              <div className="flex gap-3 text-xl text-[#836f56] mb-6">
                <a href="mailto:email@example.com">✉️</a>
                <a href="#">🔗</a>
                <a href="#">🐙</a>
              </div>
              <nav className="text-[#836f56] text-lg font-medium space-y-3 text-center">
                <Link href="/" className="block hover:text-green-900">About</Link>
                <Link href="/work" className="block hover:text-green-900">Recent Work</Link>
                <Link href="/resume" className="block hover:text-green-900">Resume</Link>
                <Link href="/misc" className="block hover:text-green-900">Miscellaneous</Link>
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
