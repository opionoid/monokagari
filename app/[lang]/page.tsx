import { Locale } from "@/i18n/i18n-config";
import LocaleSwitcher from "../_components/locale-switcher";
import TopHero from "./_components/top-hero";
import TopNavigation from "./_components/top-navigation";

export default async function Tales({ params }: { params: { lang: Locale } }) {
  return (
    <main>
      <LocaleSwitcher />
      <TopHero />
      <TopNavigation />
    </main>
  );
}
