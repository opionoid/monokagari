import { Tale, getTale } from "../fetchTales";
import { format } from "date-fns"; 
import styles from "./page.module.css";

export default async function Tale({ params }: { params: { slug: string } }) {
  const tale = await getTale(params.slug);
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
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
  parent?: ResolvingMetadata;
}): Promise<Metadata> {
  const tale = await getTale(params.slug);
  return {
    title: tale?.title,
    description: tale?.description,
  };
}
