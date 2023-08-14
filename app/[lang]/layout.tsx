import '@/app/_styles/index.css'
import { Locale, i18n } from '../../i18n/i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata = {
  title: 'ものかがり',
  description: 'TRPGなどのシナリオ集',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body>
        {children}
      </body>
    </html>
  )
}
