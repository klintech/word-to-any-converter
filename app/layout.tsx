import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Word Converter',
  description: 'Convert words to different formats easily',
  generator: 'klintech',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
