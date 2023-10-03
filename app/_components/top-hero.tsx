import styles from "./top-hero.module.css";

export default function TopHero() {
  return (
    <h1 className={styles['hero']} aria-label="ものかがり">
      <span className={styles["mo"]}>も</span>
      <span>の</span>
      <br />
      <span className={styles['kagari']}>&nbsp;かがり</span>
    </h1>
  );
}
