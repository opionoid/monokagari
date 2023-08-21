import { format } from "date-fns";
import styles from "./page.module.css";

export default async function Tale({
  params,
}: {
  params: { lang: Locale; slug: string };
}) {
  const res = await $fetch(`/api/${params.lang}/tales/${params.slug}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  const tale = data?.tale ?? {};
  const date = format(new Date(tale.date), "yyyy.MM.dd");

  if (!tale) return null;
  return (
    <main>
      <article className={styles.tale}>
        <header>
          <h1>{tale.title}</h1>
          <small>
            <time dateTime={tale.date}>{date}</time>
          </small>
        </header>
        <section dangerouslySetInnerHTML={{ __html: unescape(tale.escapedHtml) }} />
      </article>
    </main>
  );
}

/**
 * Dynamic Metadata
 */
import type { Metadata } from "next";
import { Locale } from "@/i18n/i18n-config";
import { Tale } from "@/tales/tale-type";
import { $fetch } from "@/app/api/helper";
import { unescape } from "querystring";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const res = await $fetch(`/api/${params.lang}/tales/${params.slug}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  const tale: Tale = data.tale;
  return {
    title: tale?.title,
    description: tale?.lead,
  };
}
