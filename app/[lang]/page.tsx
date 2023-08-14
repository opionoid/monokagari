import Link from "next/link";
import { getSortedTales } from "../../tales/fetch-tales";
import { Locale } from "@/i18n/i18n-config";
import LocaleSwitcher from "../_components/locale-switcher";

export default async function Tales({ params }: { params: { lang: Locale }}) {
  const tales = await getSortedTales(params.lang);
  return (
    <main>
      {/** FIXME: next dev時のみエラーが発生する */}
      {process.env.NODE_ENV !== 'development' && <LocaleSwitcher />}
      {tales.map((tale) => (
        <Link key={tale.id} href={"/" + tale.id}>
          <h3>{tale.title}</h3>
        </Link>
      ))}
    </main>
  );
}
