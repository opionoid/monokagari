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
  if (res.headers.get('content-type') === "text/html") {
    return null
  }
  const data = await res.json();
  const tale = data.tale as Tale;
  const date = format(new Date(tale.date), "yyyy.MM.dd");
  return (
    <main>
      <article className={styles.tale}>
        <header>
          <h1>{tale.title}</h1>
          <small>
            <time dateTime={tale.date}>{date}</time>
          </small>
        </header>
        <section dangerouslySetInnerHTML={{ __html: tale.contentHtml }} />
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

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const res = await $fetch(`/api/${params.lang}/tales/${params.slug}`, {
    cache: "force-cache",
  });
  if (res.headers.get('content-text') === "text/html") {
    return {}
  }
  const tale: Tale = await res.json();
  return {
    title: tale?.title,
    description: tale?.lead,
  };
}
