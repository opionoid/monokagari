import { Locale } from "@/i18n/i18n-config";
import LocaleSwitcher from "../_components/locale-switcher";
import dynamic from "next/dynamic";
import { $fetch } from "../api/helper";
import { Tale } from "@/tales/tale-type";
import TopHero from "./_components/top-hero";

export default async function Tales({ params }: { params: { lang: Locale } }) {
  const res = await $fetch(`/api/${params.lang}/tales`, {
    cache: "no-cache",
  });
  const data = await res.json().catch((e) => {
    console.error("error", e)
    console.error("failed to res.text()", params.lang, res);
    return null;
  });
  const tales: Tale[] = data?.tales ?? [];

  const TaleCard = dynamic(() => import("./_components/top-tale-card"), {
    loading: () => <p>Loading...</p>, // TODO: skelton
    ssr: false,
  });

  return (
    <main>
      {/** FIXME: next dev時のみエラーが発生する */}
      {process.env.NODE_ENV !== "development" && <LocaleSwitcher />}
      <TopHero />
      {/** TODO: nav */}
      <nav>
        
      </nav>
      {tales?.map((tale) => (
        <TaleCard key={tale.id} {...tale} />
      ))}
    </main>
  );
}
