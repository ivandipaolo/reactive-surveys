import "@/styles/globals.css"

export const metadata = {
  title: 'Reactive Surveys',
  description: 'Complete your surveys to get tokens!',
}
declare global {
  interface Window {
    ethereum: any
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
