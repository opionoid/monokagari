import { Locale } from "@/i18n/i18n-config";
import LocaleSwitcher from "../_components/locale-switcher";
import dynamic from "next/dynamic";
import { $fetch } from "../api/helper";
import { Tale } from "@/tales/tale-type";

export default async function Tales({ params }: { params: { lang: Locale } }) {
  // const res = await $fetch(`/api/${params.lang}/tales`, {
  //   cache: "force-cache",
  // });
  // const tales: Tale[] = await res.json();
  const tales: Tale[] = [];
  const TaleCard = dynamic(() => import("../_components/tale-card"), {
    loading: () => <p>Loading...</p>, // TODO: skelton
    ssr: false,
  });

  return (
    <main>
      {/** FIXME: next dev時のみエラーが発生する */}
      {process.env.NODE_ENV !== "development" && <LocaleSwitcher />}
      {tales.map((tale) => (
        <TaleCard key={tale.id} {...tale} />
      ))}
    </main>
  );
}
