import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-screen w-60 bg-white border-r border-gray-200 fixed top-0 left-0 p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-green-900 mb-6">Ruby Lu</h1>
        <nav className="space-y-3 text-lg">
          <Link href="/about" className="text-brown-700 hover:underline">About</Link>
          <Link href="/work" className="text-brown-700 hover:underline">Recent Work</Link>
          <Link href="/resume" className="text-brown-700 hover:underline">Resume</Link>
          <Link href="/misc" className="text-brown-700 hover:underline">Miscellaneous</Link>
        </nav>
      </div>
    </div>
  );
}
