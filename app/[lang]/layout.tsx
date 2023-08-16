import "@/app/_styles/index.css";
import { Locale, i18n } from "../../i18n/i18n-config";
import {
  Sawarabi_Mincho,
  Hina_Mincho,
  Zen_Antique_Soft,
  Zen_Old_Mincho,
  Shippori_Mincho,
  Noto_Serif_JP,
} from "next/font/google";
import PixiProvider from "../_components/pixi-provider";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: "ものかがり",
  description: "TRPGなどのシナリオ集",
};

// FIXME: 好きなんだけどW400しかないから特に物語詳細ページで単調になる
const fontHeading = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const fontBody = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={`${fontHeading.variable} ${fontBody.variable}`}>
        <PixiProvider>{children}</PixiProvider>
      </body>
    </html>
  );
}
