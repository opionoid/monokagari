import Link from "next/link";
import { getSortedTales } from "../../tales/fetch-tales";

export default async function Tales({ params }: { params: { lang: string }}) {
  const tales = await getSortedTales(params.lang);
  return (
    <main>
      {tales.map((tale) => (
        <Link key={tale.id} href={"/" + tale.id}>
          <h3>{tale.title}</h3>
        </Link>
      ))}
    </main>
  );
}
