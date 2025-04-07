// src/app/layout.js
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'Ruby Lu',
  description: 'Personal website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <main className="ml-60 p-8 flex-1 overflow-y-auto min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}
