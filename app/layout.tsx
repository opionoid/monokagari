import '@/_styles/index.css'

export const metadata = {
  title: 'ものかがり',
  description: 'TRPGなどのシナリオ集',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
