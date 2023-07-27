import Link from "next/link";
import { getSortedTales } from "./fetchTales";

export default async function Tales() {
  const tales = await getSortedTales();
  return (
    <section>
      {tales.map((tale) => (
        <Link key={tale.id} href={'/' + tale.id}>
          <h3>{tale.title}</h3>
        </Link>
      ))}
    </section>
  );
}
