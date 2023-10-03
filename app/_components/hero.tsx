import styles from "./hero.module.css";

export default function Hero() {
  return (
    <h1 className={styles['hero']} aria-label="ものかがり">
      <span className={styles["mo"]}>も</span>
      <span>の</span>
      <br />
      <span className={styles['kagari']}>&nbsp;かがり</span>
    </h1>
  );
}
