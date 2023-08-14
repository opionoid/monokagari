import { Tale, getTale } from "../../../tales/fetch-tales";
import { format } from "date-fns"; 
import styles from "./page.module.css";

export default async function Tale({ params }: { params: { lang: string, slug: string } }) {
  const tale = await getTale(params.slug, params.lang);
  const date = format(new Date(tale.date), "yyyy.MM.dd");
  return (
    <article className={styles.tale}>
      <header>
        <h1>{tale.title}</h1>
        <small>
          <time dateTime={tale.date}>{date}</time>
        </small>
      </header>
      <section dangerouslySetInnerHTML={{ __html: tale.contentHtml }} />
    </article>
  );
}

/**
 * Dynamic Metadata
 */
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: string, slug: string };
}): Promise<Metadata> {
  const tale = await getTale(params.slug, params.lang);
  return {
    title: tale?.title,
    description: tale?.description,
  };
}
