import Link from "next/link";
import { getSortedTales } from "../../tales/fetch-tales";
import { Locale } from "@/i18n/i18n-config";
import LocaleSwitcher from "../_components/locale-switcher";
import dynamic from "next/dynamic";

export default async function Tales({ params }: { params: { lang: Locale }}) {
  const [latestTale, ...tales] = await getSortedTales(params.lang);
  const TaleCard = dynamic(() => import("../_components/tale-card"), {
    loading: () => <p>Loading...</p> // TODO: skelton
  });

  return (
    <main>
      {/** FIXME: next dev時のみエラーが発生する */}
      {process.env.NODE_ENV !== 'development' && <LocaleSwitcher />}
      <TaleCard {...latestTale} />
      {tales.map((tale) => (
        <TaleCard key={tale.id} {...tale} />
      ))}
    </main>
  );
}
