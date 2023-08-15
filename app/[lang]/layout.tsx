import '@/app/_styles/index.css'
import { Locale, i18n } from '../../i18n/i18n-config'
import { Sawarabi_Mincho, Hina_Mincho, Zen_Old_Mincho, Shippori_Mincho, Noto_Serif_JP }from 'next/font/google'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata = {
  title: 'ものかがり',
  description: 'TRPGなどのシナリオ集',
}

// 見出し（W400のみ存在）
const hinaMincho = Hina_Mincho({ weight: "400", subsets: ["latin"], variable: '--font-hina-mincho', display: 'swap' })
// 本文 TODO: ひな明朝と合わないような？
const zenOldMincho = Zen_Old_Mincho({ weight: "400", subsets: ["latin"], variable: '--font-zen-old-mincho', display: 'swap' })

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body className={`${hinaMincho.variable} ${zenOldMincho.variable}`}>
        {children}
      </body>
    </html>
  )
}
