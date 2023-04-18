import './globals.css'
import Navigation from '@/components/Navigation'
import Tracker from '@/components/Tracker';
import localFont from 'next/font/local'

const akira = localFont({ src: '../public/font/Akira.otf' });
export const metadata = {
  title: 'Club Week Event',
  description: 'Vote for your favorite club !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={akira.className + ' select-none text-white'}>
      <body className="bg-background flex flex-col">
        <Navigation />
        <Tracker />
        {children}
      </body>
    </html>
  )
}
